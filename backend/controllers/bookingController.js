const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const mongoose = require('mongoose');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the current booked tour
  const tour = await Tour.findById(req.params.tourId);
  console.log(
    `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${
      req.user.id
    }&price=${tour.price}`
  );

  // 2) Check if it's not sold out
  const bookings = await Booking.aggregate([
    {
      $match: {
        tour: mongoose.Types.ObjectId(tour.id),
        date: new Date(req.params.date),
      },
    },
    {
      $group: {
        _id: '$date',
        currentGroup: { $sum: '$people' },
      },
    },
  ]);
  console.log(bookings);

  const maxAvailable =
    bookings.length > 0
      ? tour.maxGroupSize - bookings[0].currentGroup
      : tour.maxGroupSize;

  if (req.params.numPeople > maxAvailable || req.params.numPeople <= 0) {
    res.status(200).json({
      status: 'failed',
      data: null,
    });
  } else {
    // 3) Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/?tour=${
        req.params.tourId
      }&user=${req.user.id}&date=${req.params.date}&unitPrice=${
        tour.price
      }&people=${req.params.numPeople}&totalPrice=${
        req.params.numPeople * tour.price
      }`,
      cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
      customer_email: req.user.email,
      client_reference_id: req.params.tourId,
      line_items: [
        {
          quantity: req.params.numPeople,
          price_data: {
            currency: 'usd',
            unit_amount: tour.price * 100,
            product_data: {
              name: `${tour.name} Tour`,
              description: `Tour starting on ${new Date(
                req.params.date
              ).toLocaleString('en-us', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}. ${tour.summary}`,
              images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
            },
          },
        },
      ],
      mode: 'payment',
    });

    // 4) Create session as response
    res.status(200).json({
      status: 'success',
      session,
    });
  }
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
  const { tour, user, date, unitPrice, people, totalPrice } = req.query;
  console.log({ tour, user, date, unitPrice, people, totalPrice });
  if (!tour || !user || !date || !unitPrice || !people || !totalPrice)
    return next();
  await Booking.create({
    tour,
    user,
    date: new Date(date),
    unitPrice,
    people,
    totalPrice,
  });
  // res.redirect(`${req.protocol}://${req.get('host')}/`);
  // same than:
  res.redirect(`${req.originalUrl.split('?')[0]}`);
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

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
