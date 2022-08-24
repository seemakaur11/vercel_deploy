const mongoose = require('mongoose');
const homeSliderSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  text1: {
    type: String,
    required: true,
  },
  text2: {
    type: String,
    required: true,
  },
  text3: {
    type: String,
    required: true,
  },
});
module.exports = HomeSlider = mongoose.model('HomeSlider', homeSliderSchema);
