const Booking = require('../models/bookingModel');
const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const Tour = require('../models/tourModel');
const ReviewAPIFeatures = require('../utils/reviewApiFeatures');
const ObjectId = require('mongodb').ObjectID;

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

exports.top10 = catchAsync(async (req, res, next) => {
  req.query.limit = '10';
  req.query.hidden = { $ne: true };
  req.query.sort = '-rating,-createdAt';
  next();
});

exports.filterOnlyAuthorizedTours = async (req, res, next) => {
  if (req.user.role === 'admin') return next();

  const tour = await Tour.find({
    guides: { $in: ObjectId(req.user._id) },
  }).select('_id');
  req.query.tour = tour.map((tour) => ObjectId(tour._id));

  next();
};

exports.requireAvgRating = (req, res, next) => {
  req.params.getAvgRating = true;
  next();
};

exports.getReviewsByAggregation = catchAsync(async (req, res, next) => {
  let features = new ReviewAPIFeatures(Review, req.query, next)
    .filter()
    .search()
    .sort()
    .limitFields()
    .createAggregation();

  const featuresWithPagination = new ReviewAPIFeatures(Review, req.query, next)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate()
    .createAggregation();

  let avgRating = undefined;
  if (req.params.getAvgRating) {
    const allDocs = await features.aggregation;
    const sum = allDocs[0].data.reduce((acc, review) => acc + review.rating, 0);
    avgRating = Math.trunc((sum / allDocs[0].data.length) * 100) / 100;
  }

  const docs = await featuresWithPagination.aggregation;

  const reviews = docs[0].data.map((review) => ({
    ...review,
    user: review.user[0],
    tour: review.tour[0],
  }));

  const totalResults = docs[0].totalCount[0].total ?? 0;

  res.status(200).json({
    status: 'success',
    results: docs.length,
    totalResults,
    avgRating,
    data: {
      data: reviews,
    },
  });
});

exports.getReview = factory.getOne(Review);
exports.getAllReviews = factory.getAll(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
