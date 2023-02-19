const mongoose = require('mongoose');
const AppError = require('./../utils/appError');

const bookingSchema = new mongoose.Schema({
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
  totalPrice: {
    type: Number,
    required: [true, 'Booking mut have a total price.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre('save', function (next) {
  if (!this.kidPrice) this.kidPrice = this.price;

  if (!this.kids && !this.adults)
    return next(
      new AppError('A booking must have a number of adults or kids!', 400)
    );

  next();
});

bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
