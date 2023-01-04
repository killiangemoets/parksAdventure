const mongoose = require('mongoose');
const Tour = require('./tourModel');

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
  unitPrice: {
    type: Number,
    required: [true, 'Booking mut have a unit price.'],
  },
  people: {
    type: Number,
    required: [true, 'Booking mut have a number of people.'],
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

bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
