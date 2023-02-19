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
  photo: { type: String, default: 'default.jpg' },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (val) {
        return /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/.test(
          val
        );
      },
      message: `Please provide a valid phone number`,
    },
  },
  birthDate: Date,
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  active: {
    type: Boolean,
    default: false,
    select: false,
  },
});

// PRE SAVE MIDDLEWARES //
userSchema.pre('save', async function (next) {
  // Encrypt the password only if it has been modified or created
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// userSchema.pre('save', function (next) {
//   if (!this.isModified('password') || this.isNew) return next();

//   this.passwordChangedAt = Date.now() - 1000;
//   // We substract one second to be sure than in the resetPassword function, if the token is created before this.passwordChangedAt has been update, this.passwordChangedAt is still lower than JWTTimestamp

//   next();
// });

// QUERY MIDDLEWARES //
// userSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });
//   this.find({
//     $or: [
//       { emailVerificationToken: { $ne: undefined } },
//       { emailVerificationToken: { $eq: undefined }, active: { $ne: false } },
//     ],
//   });
//   next();
// });

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

  // Encrypt the token using the sha256 algorithms
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires =
    Date.now() + process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
