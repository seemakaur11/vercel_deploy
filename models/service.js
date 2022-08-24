const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
module.exports = Service = mongoose.model('Service', serviceSchema);
