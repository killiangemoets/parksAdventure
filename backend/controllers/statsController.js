const User = require('./../models/userModel');
const Tour = require('./../models/tourModel');
const Booking = require('./../models/bookingModel');
const Review = require('./../models/reviewModel');
const AppError = require('./../utils/appError');

exports.getAllStats = catchAsync(async (req, res, next) => {
  const userCount = await User.find().count();
  const tourCount = await Tour.find().count();
  const ratingAverage = await Review.aggregate([
    {
      $group: {
        _id: null,
        ratingAverage: { $avg: '$rating' },
      },
    },
  ]);
  const bookingCounts = await Booking.aggregate([
    {
      $group: {
        _id: null,
        totalKids: { $sum: '$kids' },
        totalAdults: { $sum: '$adults' },
        totalCount: { $sum: 1 },
        totalKidsRevenue: {
          $sum: {
            $multiply: ['$kids', '$kidPrice'],
          },
        },
        totalAdultRevenue: {
          $sum: {
            $multiply: ['$adults', '$price'],
          },
        },
      },
    },
  ]);

  const currentDate = new Date();
  const totalAvailabilities = await Tour.aggregate([
    {
      $unwind: '$availabilities',
    },
    {
      $group: {
        _id: null,
        totalMaxGroupSize: { $sum: '$availabilities.maxGroupSize' },
      },
    },
    {
      $project: {
        _id: 0,
        totalMaxGroupSize: 1,
      },
    },
  ]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentMonth - 6);

  const sixMonthsAgoYear = sixMonthsAgo.getFullYear();
  const sixMonthsAgoMonth = sixMonthsAgo.getMonth();

  const bookingsStats = await Booking.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(
            `${sixMonthsAgoYear}-${`0${sixMonthsAgoMonth + 1}`.slice(-2)}-01`
          ),
          $lte: new Date(
            `${currentYear}-${`0${currentMonth + 1}`.slice(-2)}-01`
          ),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$date' },
        totalKids: { $sum: '$kids' },
        totalAdults: { $sum: '$adults' },
        totalKidsRevenue: {
          $sum: {
            $multiply: ['$kids', '$kidPrice'],
          },
        },
        totalAdultsRevenue: {
          $sum: {
            $multiply: ['$adults', '$price'],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        totalBookings: { $add: ['$totalKids', '$totalAdults'] },
        totalRevenue: { $add: ['$totalKidsRevenue', '$totalAdultsRevenue'] },
      },
    },
  ]);

  const availabilitiesStats = await Tour.aggregate([
    { $unwind: '$availabilities' },
    {
      $match: {
        'availabilities.date': {
          $gte: new Date(
            `${sixMonthsAgoYear}-${`0${sixMonthsAgoMonth + 1}`.slice(-2)}-01`
          ),
          $lte: new Date(
            `${currentYear}-${`0${currentMonth + 1}`.slice(-2)}-01`
          ),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$availabilities.date' },
        totalMaxGroupSize: { $sum: '$availabilities.maxGroupSize' },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        totalAvailabilities: { $add: ['$totalMaxGroupSize'] },
      },
    },
  ]);

  const ratingsStatsFromDB = await Review.aggregate([
    {
      $match: {
        rating: {
          $in: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        },
      },
    },
    {
      $group: {
        _id: '$rating',
        rating: { $first: '$rating' },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  const bookingsByUserStats = await Booking.aggregate([
    {
      $group: {
        _id: '$user',
        bookingCount: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: '$bookingCount',
        bookingCount: { $first: '$bookingCount' },
        userCount: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  const revenueByTour = await Tour.aggregate([
    {
      $lookup: {
        from: 'bookings',
        localField: '_id',
        foreignField: 'tour',
        as: 'bookings',
      },
    },
    {
      $addFields: {
        totalRevenue: {
          $sum: {
            $map: {
              input: '$bookings',
              as: 'booking',
              in: {
                $add: [
                  { $multiply: ['$$booking.kids', '$$booking.kidPrice'] },
                  { $multiply: ['$$booking.adults', '$$booking.price'] },
                ],
              },
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        tourId: '$_id',
        name: 1,
        totalRevenue: 1,
        startLocation: 1,
      },
    },
  ]);

  const monthsList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const statsByMonth = [];
  let currentMonthValue = sixMonthsAgoMonth;
  for (let i = 0; i < 6; i++) {
    const availabilitiesStat = availabilitiesStats.find(
      (availability) => availability.month === currentMonthValue + 1
    );
    const bookingsStat = bookingsStats.find(
      (booking) => booking.month === currentMonthValue + 1
    );
    statsByMonth.push({
      monthValue: currentMonthValue + 1,
      month: monthsList[currentMonthValue],
      totalAvailabilities: availabilitiesStat?.totalAvailabilities || 0,
      totalBookings: bookingsStat?.totalBookings || 0,
      totalRevenue: bookingsStat?.totalRevenue || 0,
    });
    currentMonthValue = currentMonthValue === 11 ? 0 : currentMonthValue + 1;
  }

  const ratings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  const ratingsStats = ratings.map((rating) => ({
    rating,
    count:
      ratingsStatsFromDB.find((stat) => stat.rating === rating)?.count || 0,
  }));

  const toursWithTheMostHikers = await Booking.aggregate([
    {
      $lookup: {
        from: 'tours',
        let: { tourId: '$tour' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$tourId'] },
            },
          },
          {
            $project: {
              _id: 0,
              name: 1,
            },
          },
        ],
        as: 'tourData',
      },
    },
    {
      $unwind: '$tourData',
    },
    {
      $group: {
        _id: '$tour',
        totalGroup: { $sum: '$group' },
        totalBookings: { $sum: 1 },
        tourData: { $first: '$tourData' },
      },
    },
    {
      $sort: { totalGroup: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      userCount,
      tourCount,
      ratingAverage: ratingAverage[0].ratingAverage,
      bookingsCount: bookingCounts[0].totalCount,
      availabilitiesCount: totalAvailabilities[0].totalMaxGroupSize,
      hikersCount: bookingCounts[0].totalKids + bookingCounts[0].totalAdults,
      totalRevenue:
        bookingCounts[0].totalKidsRevenue + bookingCounts[0].totalAdultRevenue,
      ratingsStats,
      bookingsByUserStats,
      revenueByTour,
      statsByMonth,
      toursWithTheMostHikers,
    },
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const tour = await Tour.find({ slug: req.params.slug });
  if (!tour) return next(new AppError('No tour found with that slug', 404));

  if (
    req.user.role === 'lead-guide' &&
    !tour[0].guides.find(
      (guide) => guide._id.toString() === req.user._id.toString()
    )
  ) {
    return next(
      new AppError(
        'You are not authorized to consult the stats of this tour',
        404
      )
    );
  }

  const tourId = tour[0]._id;

  const userCountRequest = await Booking.aggregate([
    {
      $match: {
        tour: { $eq: tourId },
      },
    },
    {
      $group: {
        _id: '$user',
        userCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        user: '$_id',
        userCount: 1,
      },
    },
  ]);
  const userCount = userCountRequest.length;

  const startsCount = tour[0].availabilities.reduce((acc, curr) => {
    if (new Date(curr.date) < new Date()) return acc + 1;
    else return acc;
  }, 0);

  const ratingAverage = await Review.aggregate([
    {
      $match: {
        tour: { $eq: tourId },
      },
    },
    {
      $group: {
        _id: null,
        ratingAverage: { $avg: '$rating' },
      },
    },
  ]);
  const bookingCounts = await Booking.aggregate([
    {
      $match: {
        tour: { $eq: tourId },
      },
    },
    {
      $group: {
        _id: null,
        totalKids: { $sum: '$kids' },
        totalAdults: { $sum: '$adults' },
        totalCount: { $sum: 1 },
        totalKidsRevenue: {
          $sum: {
            $multiply: ['$kids', '$kidPrice'],
          },
        },
        totalAdultRevenue: {
          $sum: {
            $multiply: ['$adults', '$price'],
          },
        },
      },
    },
  ]);
  const totalAvailabilities = await Tour.aggregate([
    {
      $match: {
        _id: { $eq: tourId },
      },
    },
    {
      $unwind: '$availabilities',
    },
    {
      $group: {
        _id: null,
        totalMaxGroupSize: { $sum: '$availabilities.maxGroupSize' },
      },
    },
    {
      $project: {
        _id: 0,
        totalMaxGroupSize: 1,
      },
    },
  ]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentMonth - 6);

  const sixMonthsAgoYear = sixMonthsAgo.getFullYear();
  const sixMonthsAgoMonth = sixMonthsAgo.getMonth();

  const bookingsStats = await Booking.aggregate([
    {
      $match: {
        tour: { $eq: tourId },
        date: {
          $gte: new Date(
            `${sixMonthsAgoYear}-${`0${sixMonthsAgoMonth + 1}`.slice(-2)}-01`
          ),
          $lte: new Date(
            `${currentYear}-${`0${currentMonth + 1}`.slice(-2)}-01`
          ),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$date' },
        totalKids: { $sum: '$kids' },
        totalAdults: { $sum: '$adults' },
        totalKidsRevenue: {
          $sum: {
            $multiply: ['$kids', '$kidPrice'],
          },
        },
        totalAdultsRevenue: {
          $sum: {
            $multiply: ['$adults', '$price'],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        totalBookings: { $add: ['$totalKids', '$totalAdults'] },
        totalRevenue: { $add: ['$totalKidsRevenue', '$totalAdultsRevenue'] },
      },
    },
  ]);

  const availabilitiesStats = await Tour.aggregate([
    {
      $match: {
        _id: { $eq: tourId },
      },
    },
    { $unwind: '$availabilities' },
    {
      $match: {
        'availabilities.date': {
          $gte: new Date(
            `${sixMonthsAgoYear}-${`0${sixMonthsAgoMonth + 1}`.slice(-2)}-01`
          ),
          $lte: new Date(
            `${currentYear}-${`0${currentMonth + 1}`.slice(-2)}-01`
          ),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$availabilities.date' },
        totalMaxGroupSize: { $sum: '$availabilities.maxGroupSize' },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        totalAvailabilities: { $add: ['$totalMaxGroupSize'] },
      },
    },
  ]);

  const ratingsStatsFromDB = await Review.aggregate([
    {
      $match: {
        tour: { $eq: tourId },
        rating: {
          $in: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        },
      },
    },
    {
      $group: {
        _id: '$rating',
        rating: { $first: '$rating' },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  const bookingsByUserStats = await Booking.aggregate([
    {
      $match: {
        tour: { $eq: tourId },
      },
    },
    {
      $group: {
        _id: '$user',
        bookingCount: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: '$bookingCount',
        bookingCount: { $first: '$bookingCount' },
        userCount: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  const monthsList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const statsByMonth = [];
  let currentMonthValue = sixMonthsAgoMonth;
  for (let i = 0; i < 6; i++) {
    const availabilitiesStat = availabilitiesStats.find(
      (availability) => availability.month === currentMonthValue + 1
    );
    const bookingsStat = bookingsStats.find(
      (booking) => booking.month === currentMonthValue + 1
    );
    statsByMonth.push({
      monthValue: currentMonthValue + 1,
      month: monthsList[currentMonthValue],
      totalAvailabilities: availabilitiesStat?.totalAvailabilities || 0,
      totalBookings: bookingsStat?.totalBookings || 0,
      totalRevenue: bookingsStat?.totalRevenue || 0,
    });
    currentMonthValue = currentMonthValue === 11 ? 0 : currentMonthValue + 1;
  }

  const ratings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  const ratingsStats = ratings.map((rating) => ({
    rating,
    count:
      ratingsStatsFromDB.find((stat) => stat.rating === rating)?.count || 0,
  }));

  res.status(200).json({
    status: 'success',
    data: {
      tourName: tour[0].name,
      userCount,
      startsCount,
      ratingAverage: ratingAverage[0]?.ratingAverage,
      bookingsCount: bookingCounts[0]?.totalCount,
      availabilitiesCount: totalAvailabilities[0]?.totalMaxGroupSize,
      hikersCount: bookingCounts[0]?.totalKids + bookingCounts[0]?.totalAdults,
      totalRevenue:
        bookingCounts[0]?.totalKidsRevenue +
        bookingCounts[0]?.totalAdultRevenue,
      ratingsStats,
      bookingsByUserStats,
      statsByMonth,
    },
  });
});
