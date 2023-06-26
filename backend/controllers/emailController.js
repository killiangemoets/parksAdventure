const Email = require('../utils/email');
const AppError = require('./../utils/appError');

exports.sendEmail = catchAsync(async (req, res, next) => {
  if (
    !req.body.firstname.trim() ||
    !req.body.lastname.trim() ||
    !req.body.email.trim() ||
    !req.body.message.trim()
  ) {
    return next(new AppError('Information is missing', 400));
  }

  const user = {
    email: req.body.email,
    firstname: req.body.firstname,
  };
  await new Email(user, '').contactUs();

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
