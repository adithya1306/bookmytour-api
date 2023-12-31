/* eslint-disable */
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1. Middlewares

if (process.env.NODE_ENV == 'development'){
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Creating our own middleware

app.use((req,res,next) => {
  console.log("Hello from the middleware !!");
  next()
})

app.use((req,res,next) => {
  req.requestTime = new Date().toISOString();
  next();
})

// Mounting the routes

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

module.exports = app;
