const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post(
  '/payment-session',
  bookingController.checkAvailabilities,
  bookingController.getPaymentSession,
  bookingController.saveCheckoutItems
);

router.patch('/validate-order/:token', bookingController.validateOrder);

router
  .route('/mine')
  .get(bookingController.getMe, bookingController.getBookingsByAggregation);

router.route('/mine/:id').get(bookingController.getBookingDetails);

router
  .route('/all')
  .get(
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    bookingController.filterOnlyAuthorizedTours,
    bookingController.requireTotalHikers,
    bookingController.getBookingsByAggregation
  );

router
  .route('/')
  .get(
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    bookingController.filterOnlyAuthorizedTours,
    bookingController.requireTotalHikers,
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

module.exports = router;
