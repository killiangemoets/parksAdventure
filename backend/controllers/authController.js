const util = require('util');
const crypto = require('crypto');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ), // the browser will delete the cookie after it has expired
    httpOnly: true, //the cookie cannot be accessed or modified in any way by the browser
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.sameSite = 'none';
    cookieOptions.secure = true; //  the cookie will only be sent on an encrpyted connection (so when using https)
  }

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if active user exists && password is correct
  const user = await User.findOne({ email, active: { $ne: false } }).select(
    '+password'
  );

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  createSendToken(user, 200, res);
});

const createSessionToken = (sessionToken, statusCode, res) => {
  const signedToken = signToken(sessionToken);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.SESSION_COOKIE_EXPIRES_IN * 60 * 1000
    ), // the browser will delete the cookie after it has expired
    httpOnly: true, //the cookie cannot be accessed or modified in any way by the browser
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.sameSite = 'none';
    cookieOptions.secure = true; //  the cookie will only be sent on an encrpyted connection (so when using https)
  }

  res.cookie('tmp', signedToken, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    data: {
      tmpToken: signedToken,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const emailVerificationSessionToken = crypto.randomBytes(32).toString('hex');

  const emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: 'user',
    emailVerificationTokens: [emailVerificationToken],
    emailVerificationSessionToken,
  });

  try {
    const redirectUri = req.body.redirectUri;
    const redirectUriQuery = redirectUri ? `?uri=${redirectUri}` : '';
    const emailVerificationUrl = `${process.env.EMAIL_VERIFICATION_URL}/${verificationToken}${redirectUriQuery}`;
    await new Email(newUser).sendVerificationEmail(emailVerificationUrl);

    createSessionToken(emailVerificationSessionToken, 200, res);
  } catch (err) {
    newUser.emailVerificationTokens = undefined;
    await newUser.save({ validateBeforeSave: false });
    return next(
      new AppError('there was an error sending the verification email', 400)
    );
  }
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  // 1) Verify that token is present
  if (!req.params.token) return next(new AppError('token is missing', 400));

  // 2) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  let sessionToken;
  if (req.headers['x-tmp-token']) {
    sessionToken = req.headers['x-tmp-token'];
  } else if (req.cookies.tmp) {
    sessionToken = req.cookies.tmp;
  }

  const decoded =
    sessionToken && sessionToken !== 'null'
      ? await util.promisify(jwt.verify)(sessionToken, process.env.JWT_SECRET)
      : { id: undefined };

  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.sameSite = 'none';
    cookieOptions.secure = true; //  the cookie will only be sent on an encrpyted connection (so when using https)
  }

  res.cookie('tmp', 'null', cookieOptions);

  const user = await User.findOne({
    emailVerificationTokens: { $in: [hashedToken] },
  });

  // 3) If there is no updated user return error
  if (!user)
    return next(new AppError('Token is invalid or has already been used', 400));

  const emailVerificationSessionToken = user.emailVerificationSessionToken;
  user.active = true;
  user.emailVerificationTokens = undefined;
  user.emailVerificationSessionToken = undefined;
  await user.save({ validateBeforeSave: false });

  // 4) Send response
  if (emailVerificationSessionToken === decoded.id) {
    createSendToken(user, 200, res);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        user: undefined,
      },
    });
  }
});

exports.resendEmail = catchAsync(async (req, res, next) => {
  const verificationToken = crypto.randomBytes(32).toString('hex');

  const emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  const user = await User.findOneAndUpdate(
    {
      email: req.body.email,
    },
    {
      $inc: { emailVerificationTokenResend: 1 },
      $push: { emailVerificationTokens: emailVerificationToken },
    },
    {
      new: true,
      runValidators: true,
    }
  ).select('+emailVerificationTokenResend +emailVerificationTokens');

  if (!user) return next(new AppError('No user found for this email', 400));
  if (user.active)
    return next(
      new AppError('The email of this user has already been verified', 508)
    );
  if (user.emailVerificationTokenResend >= 5)
    return next(
      new AppError(
        'You have reached the limit of the number of emails you can send',
        508
      )
    );
  const redirectUri = req.body.redirectUri;
  const redirectUriQuery = redirectUri ? `?uri=${redirectUri}` : '';
  const emailVerificationUrl = `${process.env.EMAIL_VERIFICATION_URL}/${verificationToken}${redirectUriQuery}`;

  await new Email(user).sendVerificationEmail(emailVerificationUrl);

  res.status(200).json({
    status: 'success',
    message: 'A new verification email has been sent',
  });
});

exports.logout = catchAsync(async (req, res) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.sameSite = 'none';
    cookieOptions.secure = true; //  the cookie will only be sent on an encrpyted connection (so when using https)
  }
  res.cookie('jwt', 'logged out', cookieOptions);

  res.status(200).json({ status: 'success' });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // else if (req.cookies?.jwt) {
  //   token = req.cookies.jwt;
  // }

  if (!token || token === 'logged out') {
    return next(
      new AppError('You are not logged in! Please log in to get access')
    );
  }

  // 2) Verification token
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3) Check if user still exists
  const currentUser = await User.findOne({
    _id: decoded.id,
    active: { $ne: false },
  });

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist or the token has expired.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password. Please login again!', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // req.user comes from the protect middleware
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on posted email
  const user = await User.findOne({
    email: req.body.email,
    active: { $ne: false },
  });
  if (!user) {
    return next(new AppError('There is no user with this email address.', 404));
  }

  // 2) Generate the random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetPasswordUrl = `${process.env.RESET_PASSWORD_URL}/${resetToken}`;
    await new Email(user).sendPasswordResetEmail(resetPasswordUrl);

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        400
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
    active: { $ne: false },
  });

  // 2) If there is a user, and token has not expired, set the new password
  if (!user) return next(new AppError('Token is invalid or has expired', 400));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  if (!req.body.stayConnected) user.passwordChangedAt = Date.now() - 1000;
  await user.save();

  // 3) Send user info
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findOne({
    _id: req.user.id,
    active: { $ne: false },
  }).select('+password');

  // 2) Check if POSTED current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
    return next(new AppError('Your current password is wrong', 401));

  // 3) If so, UPDATE password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  if (!req.body.stayConnected) user.passwordChangedAt = Date.now() - 1000;

  await user.save();

  // 4) Log user in, so send JWT
  createSendToken(user, 200, res);
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
});

exports.getLoggedInUser = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token || token === 'logged out') {
    return next();
  }

  // 2) Verification token
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3) Check if user still exists
  const currentUser = await User.findOne({
    _id: decoded.id,
    active: { $ne: false },
  });

  if (!currentUser) {
    return next();
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next();
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.createTourGuide = catchAsync(async (req, res, next) => {
  if (!(req.body.role === 'guide' || req.body.role === 'lead-guide')) {
    return next(
      new AppError('The route is only to create guides and lead-guides')
    );
  }

  const temporaryPassword = crypto.randomBytes(4).toString('hex');

  const verificationToken = crypto.randomBytes(32).toString('hex');

  const emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: temporaryPassword,
    passwordConfirm: temporaryPassword,
    role: req.body.role,
    emailVerificationTokens: [emailVerificationToken],
  });

  try {
    const emailVerificationUrl = `${process.env.TOUR_GUIDE_EMAIL_VERIFICATION_URL}/${verificationToken}`;
    await new Email(newUser).sendGuideVerificationEmail(emailVerificationUrl);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    newUser.emailVerificationTokens = undefined;
    await newUser.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error sending the verification email. Try again or contact us!',
        400
      )
    );
  }
});

exports.activateTourGuide = catchAsync(async (req, res, next) => {
  // 1) Verify that token is present
  if (!req.params.token) return next(new AppError('token is missing', 400));

  // 2) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationTokens: { $in: [hashedToken] },
  });

  // 3) If there is no updated user return error
  if (!user)
    return next(new AppError('Token is invalid or has already been used', 400));

  user.active = true;
  user.emailVerificationTokens = undefined;
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save({ validateBeforeSave: false });

  // 4) Send response
  res.status(200).json({
    status: 'success',
    data: {
      user: undefined,
    },
  });
});
