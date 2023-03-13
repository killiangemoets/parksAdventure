const multer = require('multer');
const sharp = require('sharp');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const uploadToCloudinary = require('./../utils/uploadToCloudinary');

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

exports.requiredFields = (req, res, next) => {
  req.query.fields =
    'name,slug,duration,summary,imageCover,maxGroupSize,difficulty,ratingsAverage,ratingsQuantity,startLocation,availabilities,popularity';
  next();
};

exports.aliasTopRecommandations = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-popularity,-ratingsAvarage';
  next();
};

exports.getAllTours = factory.getAll(Tour);

exports.getTour = factory.getOne(Tour, [{ path: 'reviews' }]);

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
