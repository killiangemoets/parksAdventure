const Booking = require('../models/bookingModel');
const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.setTourAndUserId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;

  // Add connected user to body
  req.body.user = req.user.id;
  next();
};

exports.checkIfTourIsCompleted = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({
    tour: req.body.tour,
    user: req.body.user,
  });

  const bookingCompleted = bookings.find((booking) => {
    let endDate = new Date(booking.date);
    endDate.setDate(new Date(booking.date).getDate() + booking.tour.duration);
    return endDate < new Date(Date.now());
  });

  if (!bookingCompleted)
    return next(
      new AppError(
        'Reviews can only be left once the activity is completed.',
        500
      )
    );

  next();
});

exports.getMe = catchAsync(async (req, res, next) => {
  req.query.user = req.user.id;
  next();
});

exports.setEdited = catchAsync(async (req, res, next) => {
  req.body.edited = true;
  next();
});

exports.getReview = factory.getOne(Review);
exports.getAllReviews = factory.getAll(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
