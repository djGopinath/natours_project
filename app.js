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

//Own Middlware
app.use((req, res, next) => {
  next();
});
//Own Middlware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
