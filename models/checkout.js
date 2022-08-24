const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  orderId: { typr: String },
  product: {
    productId: {
      type: String,
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
    },
    quantity: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  currency: {
    type: String,
  },
  customer: {
    type: String,
  },
  receipt_email: {
    type: String,
  },
  description: {
    type: String,
  },
  shipping: {
    name: { type: String },
    address: {
      address1: { type: String },
      address2: { type: String },
      city: { type: String },
      country: { type: String },
      state: { type: String },
      postal_code: { type: Number },
    },
  },
  deliveredAt: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Checkout = mongoose.model('Checkout', checkoutSchema);
