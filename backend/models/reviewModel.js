const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      maxlength: [500, 'A review cannot have more than 500 characters'],
    },
    rating: {
      type: Number,
      min: [0, 'A rate cannot be below 0'],
      max: [5, 'A rate cannot be higher than 5'],
      required: [true, 'A review need a rating'],
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
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });

  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  // since we use a static method, 'this' points to the model
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

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
  this.constructor.calcAverageRatings(this.tour);
});

// Behind the scene, findByIdAndUpdate and findByIdAndDelete are only a shorthand for findOneAndUpadate and findOneAndDelete
reviewSchema.post(/^findOneAnd/, async function (doc) {
  await doc.constructor.calcAverageRatings(doc.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
