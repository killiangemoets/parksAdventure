const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name cannot have more than 40 characters'],
      // minlength: [10, 'A tour name must have more or equal than 10 characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
      maxlength: [100, 'A tour summary cannot have more than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have an image cover'],
    },
    images: [String],
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['family', 'medium', 'difficult', 'expert'],
        message: 'Difficulty is either family, medium, difficult or expert',
      },
    },
    category: {
      type: String,
      required: [true, 'A tour must have a category'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        required: [40, 'A start location must have coordinates'],
      },
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: {
          type: String,
          default: 'no specified',
        },
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    availabilities: [
      {
        date: {
          type: Date,
          required: [true, 'An availability must have a date'],
        },
        price: {
          type: Number,
          required: [true, 'An availability must have a price'],
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
        currentGroupSize: {
          type: Number,
          default: 0,
        },
      },
    ],
    popularity: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    hiddenTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({ popularity: -1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

// Add the tour reviews to the query
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// PRE SAVE MIDDLEWARES //
// Pre-save hook: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  if (this.availabilities) {
    this.availabilities.forEach((availability) => {
      if (!availability.kidPrice) availability.kidPrice = availability.price;
    });
  }

  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARES //
// Pre-find hook: run before any find query is executed
tourSchema.pre(/^find/, function (next) {
  this.find({ hiddenTour: { $ne: true } });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

/*
// AGGREGATION MIDDLEWARES //
// We also want to exclude the secret tour of all our agregations
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});
*/

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
