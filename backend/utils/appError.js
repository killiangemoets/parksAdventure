class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // fail if 404 and error if 500
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    // This line is just to avoid than the a new object is created and a constructor function is called, that function call is not gonna appear in the stack trace, and won't pollute it.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
