const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.patch('/email-verification/:token', authController.verifyEmail);
router.post('/resend-email-verification', authController.resendEmail);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

// /!\ This will protect all the routes that come after this middleware, because middlewares run in sequence
router.use(authController.protect);

router.patch('/addToWishlist', userController.addToWishList);
router.patch('/removeFromWishlist', userController.removeFromWishList);

router.get('/isloggedin', authController.isLoggedIn);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);

router.patch(
  '/updateMe',
  userController.uploadUserPhotoToCloudinary,
  // userController.uploadUserPhoto,
  // userController.resizeUserPhoto,
  userController.updateMe
);

router.delete('/deleteMe', userController.deleteMe);

// router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
