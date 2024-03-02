//Importing modules
const express = require('express');

const app = express();
const morgan = require('morgan');
const tourRouter = require('./route/tourRoutes');
const userRouter = require('./route/userRoutes');

//Third party middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Temprory Middlwware
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// //Own Middlware
// app.use((req, res, next) => {
//   next();
// });
//Own Middlware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'failed',
  //   message: `Can't find ${req.originalUrl} on this sever!`
  // });
  const err = new Error(`Can't find ${req.originalUrl} on this sever`);
  err.status = 'failed';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message

  });
});

module.exports = app;
