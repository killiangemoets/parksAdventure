const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const mongoose = require('mongoose');
const util = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const formating = require('./../utils/formating');
const uid2 = require('uid2');
const APIFeatures = require('../utils/apiFeatures');

exports.checkAvailabilities = catchAsync(async (req, res, next) => {
  // 1) Check is there is items
  if (!req.body.items) {
    return next(new AppError('No items', 500));
  }

  // 2) Check that all the tour ids exist
  const tourIds = req.body.items.map((item) => item.tourId);
  const toursList = await Tour.find({
    _id: tourIds,
    hiddenTour: false,
  }).populate({
    path: 'bookings',
    populate: {
      path: 'user',
      select: 'firstname lastname photo',
    },
  });

  req.body.items.forEach((item) => {
    const tour = toursList.find((tour) => tour.id === item.tourId);
    if (!tour) {
      return next(new AppError('A tour id is not correct', 500));
    }

    // 3) Check if it's not sold out
    const selectedAvailability = tour.currentAvailabilities.find(
      (availability) => {
        // return formating.compareDates(availability.date, item.startingDate)
        return (
          new Date(availability.date).getDate() ===
            new Date(item.date).getDate() &&
          new Date(availability.date).getMonth() ===
            new Date(item.date).getMonth() &&
          new Date(availability.date).getFullYear() ===
            new Date(item.date).getFullYear()
        );
      }
    );

    // a tour can be soldout in 3 different cases:
    // - the availibility has been removed (by admin or guide)
    // - the group is full
    // - the date has passed
    if (
      !selectedAvailability ||
      item.adults + item.kids >
        selectedAvailability?.maxGroupSize -
          selectedAvailability?.currentGroupSize ||
      new Date(selectedAvailability.date) < new Date(Date.now())
    ) {
      return next(new AppError('A tour is not available anymore', 500));
    }
  });

  next();
});

exports.getPaymentSession = catchAsync(async (req, res, next) => {
  // 1) create payment token
  const paymentToken = crypto.randomBytes(32).toString('hex');

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${process.env.PAYMENT_SUCCESSFUL_REDIRECTION}/${paymentToken}`,
    cancel_url: process.env.PAYMENT_CANCEL_REDIRECTION,
    customer_email: req.user.email,
    expires_at: Math.trunc(
      Date.now() / 1000 + process.env.CHECKOUT_SESSION_EXPIRATION_TIME * 60
    ),
    // client_reference_id: req.params.tourId,
    line_items: req.body.items.map((item) => {
      return {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount:
            (item.adults * item.price +
              item.kids * (item.kidPrice || item.price)) *
            100,
          product_data: {
            name: item.tourName,
            description: `${formating.niceGroupDetailsString(
              item.adults,
              item.kids
            )}. ${formating.niceDatesRange(item.date, item.tourDuration)}.`,
            images: [item.tourImg],
          },
        },
      };
    }),
    mode: 'payment',
  });

  // 3) Pass session url and payment token
  req.sessionUrl = session.url;
  req.paymentToken = paymentToken;
  next();
});

exports.saveCheckoutItems = catchAsync(async (req, res, next) => {
  // 1) Create bookings
  const cartId = crypto.randomBytes(32).toString('hex');
  const cryptedPaymentToken = crypto
    .createHash('sha256')
    .update(req.paymentToken)
    .digest('hex');

  //  for(const item of req.body.items){
  req.body.items.forEach(async (item) => {
    await Booking.create({
      tour: item.tourId,
      user: req.user.id,
      date: item.date,
      price: item.price,
      kidPrice: item.kidPrice || item.price,
      adults: item.adults,
      kids: item.kids,
      totalPrice:
        item.adults * item.price + item.kids * (item.kidPrice || item.price),
      status: 'pending',
      cartId,
      paymentToken: cryptedPaymentToken,
      removeAt: new Date(
        Date.now() +
          process.env.CHECKOUT_SESSION_EXPIRATION_TIME * 60 * 1000 +
          60 * 1000
      ),
    });
  });
  //  }

  // 2) Send cartId in token
  const token = jwt.sign({ cartId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        process.env.CHECKOUT_SESSION_EXPIRATION_TIME * 60 * 1000 +
        90 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('cart', token, cookieOptions);

  // 3) send response
  res.status(200).json({
    status: 'success',
    token,
    data: {
      session: req.sessionUrl,
    },
  });
});

exports.unsaveCheckoutItems = catchAsync(async (req, res, next) => {
  // 1) Check if there is a cart id
  let cart = req.cookies.cart;
  if (!cart || cart === 'clear') return next();

  // 2) Verification token
  const decoded = await util.promisify(jwt.verify)(
    cart,
    process.env.JWT_SECRET
  );

  // 3) delete bookings
  await Booking.deleteMany({ cartId: decoded.cartId, status: 'pending' });

  // 4) remove cookie
  res.cookie('cart', 'clear', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  next();
});

exports.validateOrder = catchAsync(async (req, res, next) => {
  // 1) Verify that token is present
  if (!req.params.token) return next(new AppError('token is missing', 500));

  // 2) Crypt token
  const cryptedPaymentToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // 3) Update bookings
  const orderNumber = crypto.randomBytes(6).toString('hex').toUpperCase();
  const pin = uid2(6);
  const bookings = await Booking.updateMany(
    { paymentToken: cryptedPaymentToken },
    {
      $set: {
        removeAt: undefined,
        status: 'paid',
        paymentToken: undefined,
        cartId: undefined,
        orderNumber,
        pin,
      },
    },
    {
      new: true,
      runValidators: true, // The validators run again when we upadate a tour
    }
  );

  console.log('validateOrder', bookings);

  // 4) If no bookings updated -> error
  if (!bookings.nModified) {
    return next(new AppError('No booking found with this token', 500));
  }

  // 5) Send response
  res.status(200).json({
    status: 'success',
    data: {
      orderNumber,
    },
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  req.query.user = req.user.id;
  req.query.status = 'paid';
  next();
});

exports.getBookingDetails = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({
    _id: req.params.id,
    status: 'paid',
    user: req.user.id,
  });

  if (!bookings.length) return next(new AppError('No booking found', 500));

  const booking = bookings[0];
  console.log(booking.tour._id);

  const tour = await Tour.findById(booking.tour._id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'firstname lastname photo',
      },
    })
    .populate({
      path: 'bookings',
      populate: {
        path: 'user',
        select: 'firstname lastname photo',
      },
    });

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
      booking,
      tour,
      recommendations,
    },
  });
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

/*
exports.getAvailabilities = catchAsync(async (req, res, next) => {
  const tourId = req.params.tourId;

  const bookings = await Booking.aggregate([
    {
      $match: {
        tour: mongoose.Types.ObjectId(tourId),
      },
    },
    {
      $group: {
        _id: '$date',
        nBookings: { $sum: 1 },
        nPeople: { $sum: '$people' },
      },
    },
  ]);

  const { maxGroupSize, startDates } = await Tour.findById(tourId);

  res.status(200).json({
    status: 'success',
    data: {
      data: { bookings, maxGroupSize, startDates },
    },
  });
});
*/
