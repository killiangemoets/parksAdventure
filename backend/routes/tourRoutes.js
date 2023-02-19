const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router
  .route('/top-recommandations')
  .get(
    tourController.requiredFields,
    tourController.aliasTopRecommandations,
    tourController.getAllTours
  );

router
  .route('/')
  .get(tourController.requiredFields, tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

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
