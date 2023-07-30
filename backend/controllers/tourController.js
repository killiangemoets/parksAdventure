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
  let imagesBase64 = [];
  const uploadedImages = req.body.uploadedImages
    ? [...req.body.uploadedImages]
    : [];

  if (req.body.imagesBase64 && req.body.imagesBase64.length > 0) {
    const imgUrls = await uploadToCloudinary.uploadMultipleImages(
      req.body.imagesBase64.map((image) => image.img),
      `parkAdventures/tours`
    );
    imagesBase64 = req.body.imagesBase64.map((image, index) => ({
      img: imgUrls[index],
      index: image.index,
    }));
  }

  const sortedImages = [...imagesBase64, ...uploadedImages];
  sortedImages.sort((a, b) => a.index - b.index);
  const images = sortedImages.map((image) => image.img);

  req.body.imageCover = images.length > 0 ? images[0] : undefined;
  req.body.images = images.length > 1 ? images.slice(1) : undefined;

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

exports.getAllTours = factory.getAll(Tour);

exports.showHiddenToursIfAllowed = async (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    req.query.hiddenTour = false;
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
      }
    }
  }

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
    recommendations,
    data: {
      data: doc[0].data,
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

  const tour = await Tour.findOne(findObj)
    .populate({
      path: 'reviews',
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
        additionalInfo: tour.additionalInfo,
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
        lowerPrice: tour.lowerPrice,
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

exports.checkGroupCapacityAndIsLeadGuideAuthorized = catchAsync(
  async (req, res, next) => {
    const tour = await Tour.findById(req.params.id).populate({
      path: 'bookings',
      populate: {
        path: 'tour',
        select: 'adults kids',
      },
    });

    if (!tour) return next(new AppError('No tour found with this Id', 404));

    if (
      req.user.role === 'lead-guide' &&
      !tour.guides.find(
        (guide) => guide._id.toString() === req.user._id.toString()
      )
    ) {
      return next(
        new AppError('You are not authorized to edit this tour', 404)
      );
    }

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
  }
);

exports.getTourCalendar = catchAsync(async (req, res, next) => {
  const findObj = { slug: req.params.slug };
  const tour = await Tour.findOne(findObj).select('availabilities name');

  if (!tour) {
    return next(new AppError('No tour found with that slug', 404));
  }

  if (
    (req.user.role === 'lead-guide' || req.user.role === 'guide') &&
    !tour.guides.find(
      (guide) => guide._id.toString() === req.user._id.toString()
    )
  ) {
    return next(
      new AppError(
        'You are not authorized to consult the calendar of this tour',
        404
      )
    );
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

exports.getMyTourNames = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.user.role === 'lead-guide' || req.user.role === 'guide') {
    filter = { guides: { $in: ObjectId(req.user._id) } };
  }

  const tours = await Tour.find(filter).select('name');

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
