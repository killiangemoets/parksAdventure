const mongoose = require('mongoose');
const Tour = require('./tourModel');
const ObjectId = require('mongodb').ObjectID;

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      maxlength: [500, 'A review cannot have more than 500 characters'],
    },
    rating: {
      type: Number,
      min: [0.5, 'A rate cannot be below 0.5'],
      max: [5, 'A rate cannot be higher than 5'],
      required: [true, 'A review must have a rating'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    edited: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Each combination of tour and user has always to be unique
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
reviewSchema.index({ createdAt: 1 });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour',
    select: 'name imageCover slug duration hiddenTour',
  }).populate({
    path: 'user',
    select: 'firstname lastname photo active',
  });

  // this.populate({
  //   path: 'user',
  //   select: 'firstname lastname photo',
  // });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (tour) {
  // since we use a static method, 'this' points to the model

  const tourId = tour?._id || tour;

  const stats = await this.aggregate([
    {
      $match: { tour: tourId, hidden: { $ne: true } },
    },
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  console.log({ tourId, stats });

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRatings,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  //this points to current review and this.constructor points to the model
  console.log('save');
  this.constructor.calcAverageRatings(this.tour);
});

// Behind the scene, findByIdAndUpdate and findByIdAndDelete are only a shorthand for findOneAndUpadate and findOneAndDelete
reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (!doc) {
    return;
  }
  await doc.constructor.calcAverageRatings(doc.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
