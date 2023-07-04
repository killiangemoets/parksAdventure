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
    phoneNumber: req.body.phoneNumber,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  await new Email(user).sendContactEmail(req.body.message);

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
