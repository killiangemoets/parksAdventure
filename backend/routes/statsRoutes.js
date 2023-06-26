const express = require('express');
const authController = require('./../controllers/authController');
const statsController = require('./../controllers/statsController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(authController.restrictTo('admin'), statsController.getAllStats);

router
  .route('/:slug')
  .get(
    authController.restrictTo('admin', 'lead-guide'),
    statsController.getTourStats
  );

module.exports = router;
