const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render that template using tourdata from 1)

  res.status(200).render('overview', {
    title: 'All Tours',
    tours: tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    files: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }

  const bookings = await Booking.aggregate([
    {
      $match: {
        tour: mongoose.Types.ObjectId(tour.id),
      },
    },
    {
      $group: {
        _id: '$date',
        currentGroup: { $sum: '$people' },
      },
    },
  ]);
  // 2) Build template

  // 3) Render template using data from 1)
  // tour.startDates = tour.startDates.sort().filter((date) => date >= Date.now());

  getDatesInList = (dates) => {
    if (dates.length === 0) return 'No upcoming dates';
    let datesInList = '';
    let i = 0;
    while (dates[i] && i < 3) {
      datesInList += `${dates[i].toLocaleString('en-us', {
        month: 'long',
        year: 'numeric',
      })}, `;
      i += 1;
    }
    if (dates[i]) datesInList += 'and more';
    else datesInList = datesInList.slice(0, -2);
    return datesInList;
  };

  const nextDatesStr = getDatesInList(tour.startDates);

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
    nextDatesStr,
    bookings,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getSignUpForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create an account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyTours = catchAsync(async (req, res) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((booking) => booking.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', { title: 'My Tours', tours });
});

exports.updateUserData = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
