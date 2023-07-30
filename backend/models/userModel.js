const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  firstname: {
    type: String,
    required: [true, 'Please tell us your firstname'],
  },
  lastname: {
    type: String,
    required: [true, 'Please tell us your lastname'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  phoneNumber: {
    type: String,
    validate: {
      validator: function (val) {
        console.log({ val });
        if (val.length === 0) return true;
        return /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/.test(
          val
        );
      },
      message: `Please provide a valid phone number`,
    },
  },
  birthDate: Date,
  wishlist: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Tour',
    default: [],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  emailVerificationTokens: {
    type: [String],
    select: false,
  },
  emailVerificationSessionToken: {
    type: String,
  },
  emailVerificationTokenResend: {
    type: Number,
    default: 0,
    select: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

userSchema.index({ lastname: 1, firstname: 1 });
userSchema.index({
  firstname: 'text',
  lastname: 'text',
  email: 'text',
  phoneNumber: 'text',
  role: 'text',
});

// PRE SAVE MIDDLEWARES //
userSchema.pre('save', async function (next) {
  // Encrypt the password only if it has been modified or created
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// METHODS //
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    return JWTTimestamp < parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    // We return true if the password was changed after the token was created
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  // Create a token
  const resetToken = crypto.randomBytes(32).toString('hex');

  if (this.passwordResetTokenResend >= 5)
    return next(
      new AppError(
        'You have reached the limit of the number of emails you can send',
        508
      )
    );

  // Encrypt the token using the sha256 algorithms
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires =
    Date.now() + process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
