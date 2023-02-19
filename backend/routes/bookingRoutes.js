const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.use(authController.protect);

router.get(
  '/checkout-session/:tourId/:date/:numAdults/:numKids',
  bookingController.getCheckoutSession
);

router
  .route('/mine')
  .get(bookingController.getMe, bookingController.getAllBookings);

router
  .route('/')
  .get(
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    bookingController.getAllBookings
  )
  .post(
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.createBooking
  );

router
  .route('/:id')
  .get(
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    bookingController.getBooking
  )
  .patch(
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.updateBooking
  )
  .delete(
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.deleteBooking
  );

/*
// MIGHT BE USEFUL FOR ADMIN
router
  .route('/availabilities/:tourId')
  .get(bookingController.getAvailabilities);
  */

module.exports = router;
