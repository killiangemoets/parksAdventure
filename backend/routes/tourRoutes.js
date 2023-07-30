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

router
  .route('/cart-items')
  .get(
    tourController.tourItemsRequiredFields,
    tourController.aliasRecommendations,
    tourController.getToursByAggregation
  );

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.uploadImagesToCloudinary,
    tourController.createTour
  );

router
  .route('/my-tours-names')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'guide', 'lead-guide'),
    tourController.getMyTourNames
  );

router
  .route('/slug/:slug')
  .get(authController.getLoggedInUser, tourController.getTourBySlug);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.checkGroupCapacityAndIsLeadGuideAuthorized,
    tourController.uploadImagesToCloudinary,
    tourController.deleteImagesFromCloudinary,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.checkIfBookingsExist,
    tourController.deleteTour
  );

router
  .route('/:slug/calendar')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getTourCalendar
  );

router.use('/:tourId/reviews', reviewRouter);

module.exports = router;
