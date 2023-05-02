const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });
// mergeParams: true, bc by default each router only have access to the parameters of their specific routes

router.use(authController.protect);

router
  .route('/mine')
  .get(reviewController.getMe, reviewController.getAllReviews);

router
  .route('/')
  .get(
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    reviewController.getAllReviews
  )
  .post(
    authController.restrictTo('user'),
    reviewController.setTourAndUserId,
    reviewController.checkIfTourIsCompleted,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user'),
    reviewController.setEdited,
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
