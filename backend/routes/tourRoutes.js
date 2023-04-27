const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router
  .route('/top-recommendations')
  .get(
    tourController.aggreagationRequiredFields,
    tourController.aliasTopRecommendations,
    tourController.getToursByAggregation
  );

router
  .route('/all/aggregation')
  .get(
    tourController.aggreagationRequiredFields,
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
  // .get(tourController.requiredFields, tourController.getAllTours)
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadImagesToCloudinary,
    tourController.createTour
  );

router.route('/slug/:slug').get(tourController.getTourBySlug);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    // tourController.uploadTourImages,
    // tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
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
