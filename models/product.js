const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', //relation betwen the product and yhe user
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
module.exports = Product = mongoose.model('product', ProductSchema);
