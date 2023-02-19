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

  // 2) Check if it's not sold out
  const selectedAvailability = tour.availabilities.find(
    (availability) => availability.date === new Date(req.params.date)
  );

  if (!selectedAvailability) {
    res.status(200).json({
      status: 'failed',
      data: null,
    });
  } else {
    const currentGroup = selectedAvailability.currentGroupSize;
    const maxAvailable = tour.maxGroupSize - currentGroup;
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
        }&user=${req.user.id}&date=${req.params.date}&price=${
          selectedAvailability.price
        }&kidPrice=${selectedAvailability.kidPrice}adults=${
          req.params.numAdults
        }&kids=${req.params.numKids}&totalPrice=${
          req.params.numAdults * selectedAvailability.price +
          req.params.numKids * selectedAvailability.kidPrice
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
                images: [
                  `https://www.natours.dev/img/tours/${tour.imageCover}`,
                ],
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

exports.getMe = catchAsync(async (req, res, next) => {
  console.log(req.user.id);
  req.query.user = req.user.id;
  next();
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
