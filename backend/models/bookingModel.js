const mongoose = require('mongoose');
const AppError = require('./../utils/appError');

const bookingSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Booking must belong to a Tour!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a User!'],
    },
    date: {
      type: Date,
      required: [true, 'Booking must have a date!'],
    },
    price: {
      type: Number,
      required: [true, 'Booking mut have a unit price.'],
    },
    kidPrice: {
      type: Number,
      validate: {
        validator: function (val) {
          return val <= this.price;
        },
        message: `Kid price ({VALUE}) cannot be higher than the normal price`,
      },
    },
    adults: {
      type: Number,
      default: 0,
    },
    kids: {
      type: Number,
      default: 0,
    },
    group: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Booking mut have a total price.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      required: [true, 'booking must have a status.'],
      enum: {
        values: ['pending', 'paid'],
        message: 'Status is either pending or paid',
      },
      select: false,
    },
    cartId: {
      type: String,
    },
    pin: {
      type: String,
    },
    orderNumber: {
      type: String,
    },
    paymentToken: {
      type: String,
      select: false,
    },
    removeAt: {
      type: Date,
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookingSchema.index({ removeAt: 1 }, { expireAfterSeconds: 0 });
bookingSchema.index({
  orderNumber: 'text',
});

bookingSchema.pre('save', function (next) {
  if (!this.kidPrice) this.kidPrice = this.price;

  if (!this.kids && !this.adults)
    return next(
      new AppError('A booking must have a number of adults or kids!', 400)
    );

  this.group = this.kids + this.adults;

  next();
});

bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name duration imageCover slug meetingAddress',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
