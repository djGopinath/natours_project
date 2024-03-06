const mangoose = require('mongoose');
const validator = require('validator');

// creating a new user schema

const userSchema = new mangoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'please provide a email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please provide a confirm password'],
    minlength: 8,
  },
});

const User = mangoose.model('User', userSchema);
module.exports = User;
