const multer = require('multer');
const sharp = require('sharp');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const uploadToCloudinary = require('./../utils/uploadToCloudinary');
const TourAPIFeatures = require('../utils/tourApiFeatures');
const APIFeaturesCopy = require('../utils/apiFeatureCopy');
const Booking = require('../models/bookingModel');
const formating = require('./../utils/formating');


// UPLOAD IMAGES
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadTourImages = upload.fields([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  { name: 'images', maxCount: 3 },
]);

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  // 1) Cover image
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.imageCover}`);

  // 2) images
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

exports.uploadImagesToCloudinary = catchAsync(async (req, res, next) => {
  // Prevent user to pass directly imageCover or images
  req.body.imageCover = undefined;
  req.body.images = undefined;

  // Upload images to cloudinary
  if (req.body.imagesBase64 && req.body.imagesBase64.length > 0) {
    const imgUrls = await uploadToCloudinary.uploadMultipleImages(
      req.body.imagesBase64,
      `parkAdventures/tours`
    );
    req.body.imageCover = imgUrls[0];
    req.body.images = imgUrls.slice(1);
  }

  return next();
});

// exports.requiredFields = (req, res, next) => {
//   req.query.fields =
//     'name,slug,duration,location,imageCover,difficulty,categories,ratingsAverage,ratingsQuantity,startLocation,availabilities,popularityIndex';
//   next();
// };

exports.aggreagationRequiredFields = (req, res, next) => {
  req.query.fields =
    'name,slug,duration,location,imageCover,difficulty,categories,ratingsAverage,ratingsQuantity,startLocation,firstAvailability,lowerPrice,minGroupSizeCapacity,maxGroupSizeCapacity';
  next();
};

exports.tourItemsRequiredFields = (req, res, next) => {
  req.query.fields =
    'name,slug,duration,imageCover,ratingsAverage,ratingsQuantity,currentAvailabilities,maxGroupSizeCapacity';
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

exports.getAllTours = factory.getAll(Tour);

exports.getToursByAggregation = catchAsync(async (req, res, next) => {
  const featuresWithPagination = new TourAPIFeatures(Tour, req.query, next)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate()
    .createAggregation();
  const doc = await featuresWithPagination.aggregation;

  for (const tour of doc[0].data){
    if(tour.currentAvailabilities){ 
      const bookings = await Booking.aggregate([
        { $match: {tour: tour._id}},
        { $group: { 
          _id:  "$date",
          sum: {
            $sum: {
              $sum: ["$adults", "$kids"]
            }
          },
          count: { $sum: 1}
        }}
      ])
      for(availability of tour.currentAvailabilities){
        const bookingData = bookings.find(booking => formating.compareDates(booking._id, availability.date));
        const currentGroupSize = bookingData ? bookingData.sum : 0;
        availability.currentGroupSize =  currentGroupSize;
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
      };
    }
    recommendations = await Tour.find(queryObj).populate({
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
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    populate: {
      path: 'user',
      select: 'firstname lastname photo',
    },
  }).populate({
    path: 'bookings',
    populate: {
      path: 'user',
      select: 'firstname lastname photo',
    },
  });

  if (!tour) {
    return next(new AppError('No tour found with that slug', 404));
  }

  const recommendations = await Tour.find({
    _id: { $ne: tour._id },
    // categories: tour.categories[0],
  }).populate({
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
      tour,
      recommendations,
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
