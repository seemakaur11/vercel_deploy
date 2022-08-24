const mongoose = require('mongoose');

const placeProductSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    // ref: 'User', //relation betwen the product and yhe user
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  productId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    // data: Buffer,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
  total: {
    type: Number,
  },
});
module.exports = PlaceProduct = mongoose.model(
  'PlaceProduct',
  placeProductSchema
);
