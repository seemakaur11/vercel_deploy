const mongoose = require('mongoose');

const BrowserSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
module.exports = Browser = mongoose.model('Browser', BrowserSchema);
