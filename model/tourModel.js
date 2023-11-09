const mongoose = require('mongoose');

//modelling Tours schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must hava a name'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have MaxGroupSize'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have difficulty'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    require: [true, 'A tour must hava a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must hava a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must hava ImageCover'],
  },
  images: [String],
  createAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

// eslint-disable-next-line new-cap
const Tour = new mongoose.model('Tour', tourSchema);

module.exports = Tour;
