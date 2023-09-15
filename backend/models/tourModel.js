const mongoose = require('mongoose');
const slugify = require('slugify');
const formating = require('./../utils/formating');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name cannot have more than 40 characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
      min: [1, 'The duration must be at least 1 day'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
      maxlength: [
        700,
        'A tour description cannot have more than 700 characters',
      ],
    },
    location: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a location'],
      maxlength: [80, 'A tour location cannot have more than 80 characters'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have an image cover'],
    },
    images: {
      type: [String],
      validate: {
        validator: function (val) {
          return val.length >= 3 && val.length <= 19;
        },
        message:
          'A tour must have at least 3 pictures in addition to the cover picture and cannot have more than 20 pictures',
      },
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['family', 'medium', 'difficult', 'expert'],
        message: 'Difficulty is either family, medium, difficult, or expert',
      },
    },
    categories: {
      type: [String],
      required: [true, 'A tour must have at least one category'],
      enum: {
        values: [
          'mountain',
          'desert',
          'snow',
          'cities',
          'sea',
          'lakes',
          'jungle',
          ' savannah',
        ],
        message:
          'Categories are mountain, desert, snow, cities, sea, lakes or jungle',
      },
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
    meetingAddress: {
      type: String,
      required: [true, 'A tour must have a meeting address'],
      trim: true,
      maxlength: [
        100,
        'A meeting address cannot have more than 100 characters',
      ],
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      description: {
        type: String,
        required: [true, 'A location must have a descripion'],
        trim: true,
        maxlength: [
          80,
          'A location description cannot have more than 80 characters',
        ],
      },
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        description: {
          type: String,
          required: [true, 'A location must have a descripion'],
          trim: true,
          maxlength: [
            80,
            'A location description cannot have more than 80 characters',
          ],
        },
      },
    ],
    guides: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      ],
      required: [true, 'Tour Guides are required'],
      validate: {
        validator: function (val) {
          return val.length >= 1;
        },
        message: 'A tour must have at least one guide',
      },
    },
    availabilities: [
      {
        date: {
          type: Date,
          required: [true, 'An availability must have a date'],
        },
        time: {
          type: String,
          required: [true, 'An availability must have a time'],
        },
        price: {
          type: Number,
          required: [true, 'An availability must have a price'],
          validate: {
            validator: function (val) {
              return val > 0;
            },
            message: `Price ({VALUE}) must be hight than 0`,
          },
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
        maxGroupSize: {
          type: Number,
          required: [true, 'A tour must have a group capacity'],
          validate: {
            validator: function (val) {
              return val > 0;
            },
            message: `Group capacity ({VALUE}) must be hight than 0`,
          },
        },
      },
    ],
    additionalInfo: {
      type: [String],
      default: [],
    },
    popularityIndex: {
      type: Number,
      default: 0,
    },
    hiddenTour: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({ popularityIndex: -1, ratingsAverage: -1 });
tourSchema.index({
  name: 'text',
  description: 'text',
  location: 'text',
  difficulty: 'text',
  categories: 'text',
});
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

// Add the tour reviews to the query
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// Add the tour bookings to the query
tourSchema.virtual('bookings', {
  ref: 'Booking',
  foreignField: 'tour',
  localField: '_id',
});

tourSchema.virtual('currentAvailabilities').get(function () {
  const currentAvailabilitiesWithCurrentGroup = [];

  if (this.availabilities && this.bookings) {
    this.availabilities.forEach((availability) => {
      if (!(new Date(availability.date) >= new Date(Date.now()))) return;

      const currentGroupSize = this.bookings.reduce((acc, booking) => {
        if (!formating.compareDates(booking.date, availability.date))
          return acc;
        return acc + (booking.adults || 0) + (booking.kids || 0);
      }, 0);

      currentAvailabilitiesWithCurrentGroup.push({
        date: availability.date,
        kidPrice: availability.kidPrice,
        maxGroupSize: availability.maxGroupSize,
        price: availability.price,
        time: availability.time,
        _id: availability._id,
        currentGroupSize,
      });
    });
  }

  return currentAvailabilitiesWithCurrentGroup;
});

tourSchema.virtual('firstAvailability').get(function () {
  return this.currentAvailabilities.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )[0]?.date;
});
tourSchema.virtual('lowerPrice').get(function () {
  return this.currentAvailabilities.sort((a, b) => a.price - b.price)[0]?.price;
});
tourSchema.virtual('minGroupSizeCapacity').get(function () {
  return this.currentAvailabilities.sort(
    (a, b) => a.maxGroupSize - b.maxGroupSize
  )[0]?.maxGroupSize;
});
tourSchema.virtual('maxGroupSizeCapacity').get(function () {
  return this.currentAvailabilities.sort(
    (a, b) => b.maxGroupSize - a.maxGroupSize
  )[0]?.maxGroupSize;
});

// PRE SAVE MIDDLEWARES //
// Pre-save hook: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre('save', function (next) {
  if (this.availabilities) {
    this.availabilities.forEach((availability) => {
      if (!availability.kidPrice) availability.kidPrice = availability.price;
    });
  }
  next();
});

// QUERY MIDDLEWARES //
// Pre-find hook: run before any find query is executed
tourSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
