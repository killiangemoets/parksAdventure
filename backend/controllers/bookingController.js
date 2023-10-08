const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const util = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const formating = require('./../utils/formating');
const uid2 = require('uid2');
const ObjectId = require('mongodb').ObjectID;
const Email = require('./../utils/email');
const BookingAPIFeatures = require('../utils/bookingApiFeatures');

exports.checkAvailabilities = catchAsync(async (req, res, next) => {
  // 1) Check is there is items
  if (!req.body.items) {
    return next(new AppError('No items', 400));
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
      return next(new AppError('A tour id is not correct', 400));
    }

    // 3) Check if it's not sold out
    const selectedAvailability = tour.currentAvailabilities.find(
      (availability) => {
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
      return next(new AppError('A tour is not available anymore', 400));
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
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.sameSite = 'none';
    cookieOptions.secure = true; //  the cookie will only be sent on an encrpyted connection (so when using https)
  }

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
  let cart;
  if (req.headers['x-cart-token']) {
    cart = req.headers['x-cart-token'];
  } else if (req.cookies.tmp) {
    cart = req.cookies.tmp;
  }
  if (!cart || cart === 'clear') return next();

  // 2) Verification token
  const decoded = await util.promisify(jwt.verify)(
    cart,
    process.env.JWT_SECRET
  );

  // 3) delete bookings
  await Booking.deleteMany({ cartId: decoded.cartId, status: 'pending' });

  // 4) remove cookie
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.sameSite = 'none';
    cookieOptions.secure = true; //  the cookie will only be sent on an encrpyted connection (so when using https)
  }

  res.cookie('cart', 'clear', cookieOptions);

  next();
});

exports.validateOrder = catchAsync(async (req, res, next) => {
  // 1) Verify that token is present
  if (!req.params.token) return next(new AppError('token is missing', 400));

  // 2) Crypt token
  const cryptedPaymentToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // 3) Update bookings
  const orderNumber = crypto.randomBytes(6).toString('hex').toUpperCase();
  const pin = uid2(6);

  const bookingsToUpdate = await Booking.find({
    paymentToken: cryptedPaymentToken,
  });

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

  // 4) If no bookings updated -> error
  if (!bookings.nModified) {
    return next(new AppError('No booking found with this token', 400));
  }

  await Promise.all(
    bookingsToUpdate.map(async (booking) => {
      const tour = await Tour.findByIdAndUpdate(booking.tour._id, {
        $inc: { popularityIndex: 5 + booking.group },
      });
      const selectedAvailability = tour.availabilities.find((availability) =>
        formating.compareDates(availability.date, booking.date)
      );
      booking.time = selectedAvailability.time;
    })
  );

  const bookingDetails = bookingsToUpdate.map((booking) => {
    return {
      reservationDate: formating.niceFullDate(booking.createdAt),
      title: `${booking.tour.name} (${booking.tour.duration} ${
        booking.tour.duration > 1 ? 'days' : ' day'
      } hiking tour)`,
      referenceNumber: orderNumber,
      pin,
      fullname: `${booking.user.firstname} ${booking.user.lastname}`,
      email: booking.user.email,
      phoneNumber: booking.user.phoneNumber || '/',
      hikers: formating.niceGroupDetailsString(booking.adults, booking.kids),
      dates: `${formating.niceDatesRange(
        booking.date,
        booking.tour.duration
      )} (${booking.tour.duration} ${
        booking.tour.duration > 1 ? 'Days' : ' Day'
      })`,
      startingTime: formating.niceTime(booking.time),
      meetingPoint: booking.tour.meetingAddress,
      totalPrice: booking.totalPrice,
      adults: booking.adults,
      children: booking.kids,
      adultPrice: booking.price,
      childPrice: booking.kidPrice,
    };
  });

  await new Email(req.user).sendBookingEmail({
    url: process.env.BOOKINGS_URL,
    bookings: bookingDetails,
  });
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
  const queryObj = {
    _id: req.params.id,
    status: 'paid',
    user: req.user.id,
  };
  if (
    req.user.role === 'admin' ||
    req.user.role === 'lead-guide' ||
    req.user.role === 'guide'
  )
    delete queryObj.user;

  const bookings = await Booking.find(queryObj);

  if (!bookings.length) return next(new AppError('No booking found', 400));

  const booking = bookings[0];

  const tour = await Tour.findById(booking.tour._id)
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
    return next(new AppError('No tour found with that id', 404));
  }

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
      booking,
      tour: {
        additionalInfo: tour.additionalInfo,
        availabilities: tour.availabilities,
        categories: tour.categories,
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

exports.filterOnlyAuthorizedTours = async (req, res, next) => {
  if (req.user.role === 'admin') return next();

  const tour = await Tour.find({
    guides: { $in: ObjectId(req.user._id) },
  }).select('_id');
  req.query.tour = tour.map((tour) => ObjectId(tour._id));

  next();
};

exports.requireTotalHikers = (req, res, next) => {
  req.params.getHikers = true;
  next();
};

exports.getBookingsByAggregation = catchAsync(async (req, res, next) => {
  let features = new BookingAPIFeatures(Booking, req.query, next)
    .filter()
    .search()
    .sort()
    .limitFields()
    .createAggregation();

  const featuresWithPagination = new BookingAPIFeatures(
    Booking,
    req.query,
    next
  )
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate()
    .createAggregation();

  let numberOfHikers = undefined;
  if (req.params.getHikers) {
    const allDocs = await features.aggregation;
    numberOfHikers = allDocs[0].data.reduce(
      (acc, hiker) => acc + hiker.adults + hiker.kids,
      0
    );
  }

  const docs = await featuresWithPagination.aggregation;

  const bookings = docs[0].data.map((booking) => ({
    ...booking,
    user: booking.user[0],
    tour: booking.tour[0],
  }));

  const totalResults = docs[0].totalCount[0]?.total ?? 0;

  res.status(200).json({
    status: 'success',
    results: docs.length,
    totalResults,
    numberOfHikers,
    data: {
      data: bookings,
    },
  });
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
