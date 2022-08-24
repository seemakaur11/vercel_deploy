const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  street_address: {
    type: String,
    required: true,
  },
  suburb: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  otp: {
    type: String,
  },
  expireIn: {
    type: Number,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
module.exports = User = mongoose.model('user', UserSchema);
