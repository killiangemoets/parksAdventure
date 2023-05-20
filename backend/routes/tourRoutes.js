const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use(bookingController.unsaveCheckoutItems);

router
  .route('/top-recommendations')
  .get(
    tourController.aggreagationRequiredFields,
    tourController.aliasTopRecommendations,
    authController.getLoggedInUser,
    tourController.showHiddenToursIfAllowed,
    tourController.getToursByAggregation
  );

router
  .route('/all/aggregation')
  .get(
    tourController.aggreagationRequiredFields,
    authController.getLoggedInUser,
    tourController.showHiddenToursIfAllowed,
    tourController.getToursByAggregation
  );

router.route('/cart-items').get(
  tourController.tourItemsRequiredFields,
  tourController.aliasRecommendations,
  tourController.getToursByAggregation
  // tourController.getAllTours
);

router
  .route('/')
  // .get(tourController.requiredFields, tourController.getAllTours)
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadImagesToCloudinary,
    tourController.createTour
  );

router.route('/names').get(tourController.getAllTourNames);

router
  .route('/slug/:slug')
  .get(authController.getLoggedInUser, tourController.getTourBySlug);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.checkGroupCapacity,
    tourController.uploadImagesToCloudinary,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.checkIfBookingsExist,
    tourController.deleteTour
  );

router
  .route('/:slug/calendar')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.getTourCalendar
  );
/*
// MIGHT BE USEFUL FOR ADMIN
router.route('/tour-stats').get(tourController.getTourStats);
router
.route('/monthly-plan/:year')
.get(
  authController.protect,
  authController.restrictTo('admin', 'lead-guide', 'guide'),
  tourController.getMonthlyPlan
  );
*/

router.use('/:tourId/reviews', reviewRouter);

module.exports = router;
