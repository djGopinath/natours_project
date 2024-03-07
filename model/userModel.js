const mangoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please provide a confirm password'],
    validate: {
      validator: function (password) {
        return password === this.password;
      },
      message: 'Passwords do not match',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mangoose.model('User', userSchema);
module.exports = User;
