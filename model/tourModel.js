const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const slugify = require('slugify');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');

//modelling Tours schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'A tour must hava a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must be at least 40 characters'],
      minlength: [10, 'A tour name must be at least 10 characters'],
      validate: [validator.isAlpha, 'A tour must be alpha'],
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty may be: Easy,Medium,Difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Ratings must be between 1.0'],
      max: [5, 'Ratings must be between 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      require: [true, 'A tour must hava a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price must be below regular price',
      },
    },
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
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//Document middleware: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
/* tourSchema.pre('save', (next) => {
  console.log('will save documnet');
  next();
});

tourSchema.post('save', (doc, next) => {
  console.log(doc);
  next();
}); */

//Query MIddleware
// tourSchema.pre('find', (next) => {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

//aggregation middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

// eslint-disable-next-line new-cap
const Tour = new mongoose.model('Tour', tourSchema);

module.exports = Tour;
