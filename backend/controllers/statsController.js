const User = require('./../models/userModel');
const Tour = require('./../models/tourModel');
const Booking = require('./../models/bookingModel');
const Review = require('./../models/reviewModel');

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

    console.log({
      monthValue: currentMonthValue + 1,
      month: monthsList[currentMonthValue],
      totalAvailabilities: availabilitiesStat?.totalAvailabilities || 0,
      totalBookings: bookingsStat?.totalBookings || 0,
      totalRevenue: bookingsStat?.totalRevenue || 0,
    });
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
      userCount,
      tourCount,
      ratingAverage: ratingAverage[0].ratingAverage,
      bookingsCount: bookingCounts[0].totalCount,
      hikersCount: bookingCounts[0].totalKids + bookingCounts[0].totalAdults,
      totalRevenue:
        bookingCounts[0].totalKidsRevenue + bookingCounts[0].totalAdultRevenue,
      ratingsStats,
      bookingsByUserStats,
      revenueByTour,
      statsByMonth,
    },
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
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

    console.log({
      monthValue: currentMonthValue + 1,
      month: monthsList[currentMonthValue],
      totalAvailabilities: availabilitiesStat?.totalAvailabilities || 0,
      totalBookings: bookingsStat?.totalBookings || 0,
      totalRevenue: bookingsStat?.totalRevenue || 0,
    });
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
      userCount,
      tourCount,
      ratingAverage: ratingAverage[0].ratingAverage,
      bookingsCount: bookingCounts[0].totalCount,
      hikersCount: bookingCounts[0].totalKids + bookingCounts[0].totalAdults,
      totalRevenue:
        bookingCounts[0].totalKidsRevenue + bookingCounts[0].totalAdultRevenue,
      ratingsStats,
      bookingsByUserStats,
      revenueByTour,
      statsByMonth,
    },
  });
});

// const toursStats = await Tour.aggregate([
//     {
//       $lookup: {
//         from: 'bookings',
//         localField: '_id',
//         foreignField: 'tour',
//         as: 'bookingsData',
//       },
//     },
//     {
//       $addFields: {
//         totalBookings: { $size: '$bookingsData' },
//         bookingsByMonth: {
//           $map: {
//             input: { $range: [0, 12] },
//             as: 'month',
//             in: {
//               month: { $add: [{ $sum: ['$kids', '$adults'] }, '$$month'] },
//               count: {
//                 $size: {
//                   $filter: {
//                     input: '$bookingsData',
//                     as: 'booking',
//                     cond: {
//                       $and: [
//                         {
//                           $eq: [
//                             { $month: '$$booking.date' },
//                             {
//                               $add: [{ $sum: ['$kids', '$adults'] }, '$$month'],
//                             },
//                           ],
//                         },
//                         {
//                           $eq: [{ $year: '$$booking.date' }, 2023],
//                         },
//                       ],
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     // {
//     //   $project: {
//     //     name: 1,
//     //     totalBookings: 1,
//     //     bookingsByMonth: 1,
//     //   },
//     // },
//   ]);

// const year = 2023;
// const toursStats = await Tour.aggregate([
//   // Match the tours based on your criteria (if any)
//   // ...

//   // Populate the bookings for each tour
//   {
//     $lookup: {
//       from: 'bookings', // Assuming your bookings collection is named 'bookings'
//       localField: '_id',
//       foreignField: 'tour',
//       as: 'bookings',
//     },
//   },

//   // Unwind the bookings array
//   { $unwind: '$bookings' },

//   // Match the bookings for the specified year
//   {
//     $match: {
//       'bookings.date': {
//         $gte: new Date(`${year}-01-01`),
//         $lte: new Date(`${year}-12-31`),
//       },
//     },
//   },

//   // Group by month and calculate the sum of kids and adults
//   {
//     $group: {
//       _id: { $month: '$bookings.date' },
//       totalKids: { $sum: '$bookings.kids' },
//       totalAdults: { $sum: '$bookings.adults' },
//     },
//   },

//   // Project the results with month and combined count
//   {
//     $project: {
//       _id: 0,
//       month: '$_id',
//       totalBookings: { $add: ['$totalKids', '$totalAdults'] },
//     },
//   },
// ]);

// await Tour.aggregate([
//     {
//       $match: {
//         // Add any specific match conditions if needed
//       },
//     },
//     {
//       $lookup: {
//         from: 'bookings', // Assuming the bookings collection name is 'bookings'
//         localField: '_id',
//         foreignField: 'tour',
//         as: 'bookings',
//       },
//     },
//     {
//       $addFields: {
//         totalBookingPrice: {
//           $sum: {
//             $add: [
//               { $multiply: ['$bookings.kids', '$bookings.kidPrice'] },
//               { $multiply: ['$bookings.adults', '$bookings.price'] },
//             ],
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         month: '$_id',
//         totalBookingPrice: 1,
//         startLocation: 1,
//       },
//     },
//   ]);

//   await Booking.aggregate([
//     // Group bookings by tour and calculate the sum of kids*kidPrice+adults*price for each tour
//     {
//       $group: {
//         _id: '$tour',
//         totalAmount: {
//           $sum: {
//             $add: [
//               { $multiply: ['$kids', '$kidPrice'] },
//               { $multiply: ['$adults', '$price'] },
//             ],
//           },
//         },
//       },
//     },
//   ]);
