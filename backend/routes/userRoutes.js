const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.patch('/email-verification/:token', authController.verifyEmail);
router.post('/resend-email-verification', authController.resendEmail);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.patch('/guides/activation/:token', authController.activateTourGuide);

// /!\ This will protect all the routes that come after this middleware, because middlewares run in sequence
router.use(authController.protect);

router.get('/logout', authController.logout);

router.patch('/addToWishlist', userController.addToWishList);
router.patch('/removeFromWishlist', userController.removeFromWishList);

router.get('/isloggedin', authController.isLoggedIn);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);

router.patch(
  '/updateMe',
  userController.uploadUserPhotoToCloudinary,
  userController.updateMe
);

router.route('/names').get(userController.getAllUserNames);

router.delete('/deleteMe', userController.deleteMe);

router
  .route('/')
  .get(
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    userController.requireHiddenFields,
    userController.getAllUsers
  )
  .post(userController.createUser);

router
  .route('/details')
  .get(
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    userController.requireHiddenFields,
    userController.getAllUsersWithDetails
  );

router
  .route('/guides-details')
  .get(
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    userController.requireHiddenFields,
    userController.getAllGuidesWithDetails
  );

router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    userController.hideUserReviews,
    userController.deleteGuideTours,
    userController.updateUser
  )
  .delete(
    userController.deleteUserReviews,
    userController.deleteGuideTours,
    userController.deleteUser
  );

router.post('/guides/creation', authController.createTourGuide);

module.exports = router;
