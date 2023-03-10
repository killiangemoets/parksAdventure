const path = require('path');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanatize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHanlder = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors()); // To allow everyone
// Access-Control-Allow-Origin *

// If we want to give access to only one domain:
// app.use(
//   cors({
//     origin: 'http://localhost:3001',
//   })
// );

// const whitelist = ['http://localhost:3001'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));

app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
}); // allow 100 requests from the same IP in one hour
app.use('/api', limiter);

// Limit the amount of data that comes in the body
// app.use(express.json({ limit: '100kb' }));
app.use(express.json({ limit: '25mb' }));
// app.use(express.json());

// Parse the data from cookies
app.use(cookieParser());

// Parse data coming from a URL encoded form
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanatize());

// Data sanatization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'price',
      'duration',
      'maxGroupSize',
      'difficulty',
      'category',
      'ratingsAvarage',
      'ratingsQuantity',
    ], // we can specify a white list of properties for which we actually allow duplicates in the query string
  })
);

// Compress all the text sent to clients (not images)
app.use(compression());

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHanlder);

module.exports = app;
