const multer = require('multer');
const sharp = require('sharp');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const uploadToCloudinary = require('./../utils/uploadToCloudinary');
const TourAPIFeatures = require('../utils/tourApiFeatures');
const Booking = require('../models/bookingModel');
const formating = require('./../utils/formating');
const ObjectId = require('mongodb').ObjectID;

exports.uploadImagesToCloudinary = catchAsync(async (req, res, next) => {
  // Prevent user to pass directly imageCover or images
  req.body.imageCover = req.body.uploadedImages
    ? req.body.uploadedImages[0]
    : undefined;
  req.body.images = req.body.uploadedImages
    ? req.body.uploadedImages.slice(1)
    : undefined;

  // Upload images to cloudinary
  if (req.body.imagesBase64 && req.body.imagesBase64.length > 0) {
    const imgUrls = await uploadToCloudinary.uploadMultipleImages(
      req.body.imagesBase64,
      `parkAdventures/tours`
    );

    if (req.body.uploadedImages && req.body.uploadedImages.length > 0) {
      req.body.imageCover = req.body.uploadedImages[0];
      req.body.images = [...req.body.uploadedImages.slice(1), ...imgUrls];
    } else {
      req.body.imageCover = imgUrls[0];
      req.body.images = imgUrls.slice(1);
    }
  }

  return next();
});

exports.aggreagationRequiredFields = (req, res, next) => {
  req.query.fields =
    'name,slug,duration,location,imageCover,difficulty,categories,ratingsAverage,ratingsQuantity,startLocation,firstAvailability,lowerPrice,minGroupSizeCapacity,maxGroupSizeCapacity,hiddenTour,hasCurrentAvailabilities';
  next();
};

exports.tourItemsRequiredFields = (req, res, next) => {
  req.query.fields =
    'name,slug,duration,imageCover,ratingsAverage,ratingsQuantity,currentAvailabilities,maxGroupSizeCapacity';
  req.query.hiddenTour = false;
  next();
};

exports.aliasTopRecommendations = (req, res, next) => {
  req.query.limit = '3';
  req.query.sort = '-popularity,-ratingsAvarage';
  next();
};

exports.aliasRecommendations = (req, res, next) => {
  req.recommendations = 'true';
  next();
};

exports.updatePopularityIndex = catchAsync(async (req, res, next) => {
  await Tour.findByIdAndUpdate(req.params.id, {
    $inc: { popularityIndex: req.params.increment },
  });
  next();
});

exports.getAllTours = factory.getAll(Tour);

exports.showHiddenToursIfAllowed = async (req, res, next) => {
  if (!req.user || req.user.role === 'user') {
    req.query.hiddenTour = false;
    // req.query.onlyAvailables = undefined;
  }

  next();
};

exports.getToursByAggregation = catchAsync(async (req, res, next) => {
  const featuresWithPagination = new TourAPIFeatures(Tour, req.query, next)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate()
    .createAggregation();
  const doc = await featuresWithPagination.aggregation;

  for (const tour of doc[0].data) {
    if (tour.currentAvailabilities) {
      const bookings = await Booking.aggregate([
        { $match: { tour: tour._id } },
        {
          $group: {
            _id: '$date',
            sum: {
              $sum: {
                $sum: ['$adults', '$kids'],
              },
            },
            count: { $sum: 1 },
          },
        },
      ]);
      for (availability of tour.currentAvailabilities) {
        const bookingData = bookings.find((booking) =>
          formating.compareDates(booking._id, availability.date)
        );
        const currentGroupSize = bookingData ? bookingData.sum : 0;
        availability.currentGroupSize = currentGroupSize;
        // if(availability.currentGroupSize === availability.maxGroupSize) availability = undefined;
      }
    }
  }

  // if(req.recommendations === )
  // const featuresWithPagination = new APIFeaturesCopy(Tour, req.query, next)
  //   .filter()
  //   .sort()
  //   .limitFields()
  //   .paginate();
  // const doc = await featuresWithPagination.query;

  let recommendations = undefined;
  if (req.recommendations === 'true') {
    let queryObj = {};
    if (req.query.id) {
      queryObj = {
        _id: {
          $nin: Array.isArray(req.query.id)
            ? [...req.query.id]
            : [req.query.id],
        },
        hiddenTour: false,
      };
    }
    recommendations = await Tour.find(queryObj)
      .populate({
        path: 'bookings',
        populate: {
          path: 'user',
          select: 'firstname lastname photo',
        },
      })
      .sort('-popularityIndex -ratingsAvarage')
      .limit(3);
  }

  res.status(200).json({
    status: 'success',
    results: doc[0].data.length,
    totalResults: doc[0].totalCount[0]?.total || 0,
    // totalResults: 8,
    recommendations,
    data: {
      data: doc[0].data,
      // data: doc,
    },
  });
});

exports.getTour = factory.getOne(Tour, [
  {
    path: 'reviews',
    populate: {
      path: 'user',
      select: 'firstname lastname photo',
    },
  },
]);

exports.getTourBySlug = catchAsync(async (req, res, next) => {
  const findObj = { slug: req.params.slug };
  if (!req.user || req.user.role === 'user') findObj.hiddenTour = false;

  console.log('HEEERE');
  const tour = await Tour.findOne(findObj)
    .populate({
      path: 'reviews',
      // populate: {
      // path: 'user',
      // select: 'firstname lastname photo active',
      // },
    })
    .populate({
      path: 'bookings',
      populate: {
        path: 'tour',
        select: 'adults kids',
      },
    });

  if (!tour) {
    return next(new AppError('No tour found with that slug', 404));
  }

  tour.reviews = tour.reviews.filter((review) => review.user.active !== false);

  const recommendations = await Tour.find({
    _id: { $ne: tour._id },
    hiddenTour: false,
    // categories: tour.categories[0],
  })
    .populate({
      path: 'bookings',
      populate: {
        path: 'user',
        select: 'firstname lastname photo',
      },
    })
    .sort('-popularityIndex -ratingsAvarage')
    .limit(3);

  res.status(200).json({
    status: 'success',
    data: {
      tour: {
        additionalInfos: tour.additionalInfos,
        // availabilities: tour.availabilities,
        categories: tour.categories,
        currentAvailabilities: tour.currentAvailabilities,
        description: tour.description,
        difficulty: tour.difficulty,
        duration: tour.duration,
        firstAvailability: tour.firstAvailability,
        guides: tour.guides,
        hiddenTour: tour.hiddenTour,
        id: tour.id,
        imageCover: tour.imageCover,
        images: tour.images,
        location: tour.location,
        locations: tour.locations,
        lowPrice: tour.lowPrice,
        maxGroupSizeCapacity: tour.maxGroupSizeCapacity,
        meetingAddress: tour.meetingAddress,
        minGroupSizeCapacity: tour.minGroupSizeCapacity,
        name: tour.name,
        popularityIndex: tour.popularityIndex,
        ratingsAverage: tour.ratingsAverage,
        ratingsQuantity: tour.ratingsQuantity,
        reviews: tour.reviews,
        slug: tour.slug,
        startLocation: tour.startLocation,
        _id: tour._id,
      },
      recommendations,
    },
  });
});

exports.checkIfBookingsExist = catchAsync(async (req, res, next) => {
  const booking = await Booking.findOne({ tour: req.params.id });

  if (booking)
    return next(new AppError('A tour with bookings cannot be deleted', 404));

  next();
});

exports.checkGroupCapacity = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate({
    path: 'bookings',
    populate: {
      path: 'tour',
      select: 'adults kids',
    },
  });

  if (!tour) return next(new AppError('No tour found with this Id', 404));

  console.log('UPDATE', req.body.availabilities);

  if (
    req.body.availabilities &&
    req.body.availabilities.find((updatedAvailability) =>
      tour.currentAvailabilities?.find(
        (tourCurrentAvailability) =>
          formating.compareDates(
            tourCurrentAvailability.date,
            updatedAvailability.date
          ) &&
          tourCurrentAvailability.currentGroupSize >
            updatedAvailability.maxGroupSize
      )
    )
  )
    return next(
      new AppError(
        'A date already has bookings for a number of people higher than the new group capacity',
        404
      )
    );

  next();
});

exports.getTourCalendar = catchAsync(async (req, res, next) => {
  const findObj = { slug: req.params.slug };
  // if (!req.user || req.user.role === 'user') findObj.hiddenTour = false;
  const tour = await Tour.findOne(findObj).select('availabilities name');

  if (!tour) {
    return next(new AppError('No tour found with that slug', 404));
  }

  const bookings = await Booking.find({ tour: ObjectId(tour._id) });

  const availabilities = tour.availabilities.map((availability) => {
    const currentGroupSize = bookings.reduce((acc, booking) => {
      if (!formating.compareDates(booking.date, availability.date)) return acc;
      return acc + (booking.adults || 0) + (booking.kids || 0);
    }, 0);

    return {
      date: availability.date,
      time: availability.time,
      kidPrice: availability.kidPrice,
      price: availability.price,
      maxGroupSize: availability.maxGroupSize,
      currentGroupSize,
      _id: availability._id,
    };
  });

  res.status(200).json({
    status: 'success',
    data: {
      availabilities,
      name: tour.name,
      tourId: tour._id,
    },
  });
});

exports.getAllTourNames = catchAsync(async (req, res, next) => {
  const tours = await Tour.find().select('name');

  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
});

exports.createTour = factory.createOne(Tour);

exports.updateTour = factory.updateOne(Tour);

exports.deleteTour = factory.deleteOne(Tour);

/*
// MIGHT BE USEFUL FOR ADMIN
exports.getTourStats = catchAsync(async (req, res, next) => {
  // try {
  // The aggragation pipeline is a bit like a regular query but the difference is that in aggregations, we can manipulate the data in a couple of different steps.
  // For that, we pass in an array of so-called stages.
  // The document pass through theses stages, one by one, in the define sequence.
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        // _id: null,
        // _id: '$difficulty',
        _id: { $toUpper: '$difficulty' },
        numRatings: { $sum: '$ratingsQuantity' },
        numTours: { $sum: 1 },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 }, // (1 for ascending)
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }, //ne means not equals
    // },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  // try {
  const year = +req.params.year;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
      // By doing that we will have one document for each of the start dates
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numToursStarts: { $sum: 1 },
        // We will create an array by using push
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: { _id: 0 }, //By doing that we hide the _id field
    },
    {
      $sort: { numToursStarts: -1 },
    },
    {
      // $limit: 6, //If wee want only 6 results
      $limit: 20,
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});
*/
