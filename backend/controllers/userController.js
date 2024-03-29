const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const uploadToCloudinary = require('./../utils/uploadToCloudinary');
const APIFeatures = require('../utils/apiFeatures');
const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const ObjectId = require('mongodb').ObjectID;

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.uploadUserPhotoToCloudinary = catchAsync(async (req, res, next) => {
  if (req.body.photo && req.body.photo.includes('res.cloudinary.com')) next();
  if (req.body.photo && req.body.photo.length > 0) {
    const response = await uploadToCloudinary.uploadOneImage(
      req.body.photo,
      `parkAdventures/users`
    );
    if (response.status === 'fail') {
      return next(new AppError(response.message, 400));
    }
    req.body.photo = response.url;

    const user = await User.findById(req.user.id);
    if (user && user.photo) await uploadToCloudinary.deleteOneImage(user.photo);
  }

  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POST password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields name that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'firstname',
    'lastnmane',
    'photo',
    'phoneNumber',
    'birthDate'
  );

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.addToWishList = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { wishlist: req.body.wishlist } },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.removeFromWishList = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { wishlist: req.body.wishlist } },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};

exports.getAllUserNames = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: 'user' }).select(
    'firstname lastname email'
  );

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.requireHiddenFields = (req, res, next) => {
  req.query.fields = '+active';
  next();
};

exports.getAllUsersWithDetails = catchAsync(async (req, res, next) => {
  let features = new APIFeatures(User.find(), req.query, next)
    .filter()
    .sort()
    .limitFields();

  const featuresWithPagination = new APIFeatures(User.find(), req.query, next)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const count = await features.query.countDocuments();
  const docs = await featuresWithPagination.query;

  const newDocs = await Promise.all(
    docs.map(async (doc) => {
      const bookingsStats = await Booking.aggregate([
        {
          $match: { user: doc._id },
        },
        {
          $group: {
            _id: '$user',
            nBookings: { $sum: 1 },
          },
        },
      ]);
      const reviewsStats = await Review.aggregate([
        {
          $match: { user: doc._id },
        },
        {
          $group: {
            _id: '$user',
            nRatings: { $sum: 1 },
            avgRating: { $avg: '$rating' },
          },
        },
      ]);
      return {
        _id: doc._id,
        role: doc.role,
        firstname: doc.firstname,
        lastname: doc.lastname,
        email: doc.email,
        photo: doc.photo,
        phoneNumber: doc.phoneNumber,
        birthDate: doc.birthDate,
        active: doc.active,
        numOfBookings:
          bookingsStats.length > 0 ? bookingsStats[0].nBookings : 0,
        numOfRatings: reviewsStats.length > 0 ? reviewsStats[0].nRatings : 0,
        avgRating:
          reviewsStats.length > 0
            ? Math.round(reviewsStats[0].avgRating * 100) / 100
            : undefined,
      };
    })
  );
  res.status(200).json({
    status: 'success',
    results: docs.length,
    totalResults: count,
    data: {
      data: newDocs,
    },
  });
});

exports.getAllGuidesWithDetails = catchAsync(async (req, res, next) => {
  req.query.role = ['guide', 'lead-guide'];
  let features = new APIFeatures(User.find(), req.query, next)
    .filter()
    .sort()
    .limitFields();

  const featuresWithPagination = new APIFeatures(User.find(), req.query, next)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const count = await features.query.countDocuments();
  const docs = await featuresWithPagination.query;

  const newDocs = await Promise.all(
    docs.map(async (doc) => {
      const tours = await Tour.aggregate([
        {
          $match: {
            guides: {
              $elemMatch: {
                $eq: ObjectId(doc._id),
              },
            },
          },
        },
        { $project: { name: 1, slug: 1 } },
      ]);
      return {
        _id: doc._id,
        role: doc.role,
        firstname: doc.firstname,
        lastname: doc.lastname,
        email: doc.email,
        photo: doc.photo,
        phoneNumber: doc.phoneNumber,
        birthDate: doc.birthDate,
        active: doc.active,
        tours,
      };
    })
  );
  res.status(200).json({
    status: 'success',
    results: docs.length,
    totalResults: count,
    data: {
      data: newDocs,
    },
  });
});

exports.checkIfComingBookings = catchAsync(async (req, res, next) => {
  const comingBookings = await Booking.aggregate([
    {
      $match: {
        user: ObjectId(req.user.id),
        date: { $gt: new Date() },
      },
    },
    {
      $count: 'comingBookingsCount',
    },
  ]);

  if (comingBookings.length > 0 && comingBookings[0].comingBookingsCount > 0)
    return next(
      new AppError(
        'You cannot delete your account if you have upcoming bookings.',
        403
      )
    );

  req.params.id = req.user.id;

  next();
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id);

  if (user.photo) {
    await uploadToCloudinary.deleteOneImage(user.photo);
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.deleteUserReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: ObjectId(req.params.id) });
  reviews.forEach(async (review) => {
    await Review.findByIdAndDelete(review._id);
  });
  next();
});

exports.hideUserReviews = catchAsync(async (req, res, next) => {
  if (req.body.active === false) {
    const reviews = await Review.find({ user: ObjectId(req.params.id) });
    for (const review of reviews) {
      review.hidden = true;
      await review.save();
    }
  } else if (req.body.active === true) {
    const reviews = await Review.find({ user: ObjectId(req.params.id) });
    for (const review of reviews) {
      review.hidden = false;
      await review.save();
    }
  }
  next();
});

exports.deleteGuideTours = catchAsync(async (req, res, next) => {
  if (
    req.method === 'DELETE' ||
    (req.method === 'PATCH' && req.body.active === false)
  ) {
    const tours = await Tour.find({
      guides: {
        $elemMatch: {
          $eq: ObjectId(req.params.id),
        },
      },
    });
    for (const tour of tours) {
      tour.guides.pull(ObjectId(req.params.id));
      await tour.save();
    }
  }
  next();
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
