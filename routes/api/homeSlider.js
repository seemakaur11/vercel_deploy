const express = require('express');
const Browser = require('../../models/browser');
const Service = require('../../models/service');
const homeSlider = require('../../models/homeSlider');
const router = express.Router();

// CREATED IMAGE SLIDER
router.post('/', async (req, res) => {
  try {
    const homeDetails = new homeSlider({
      text1: req.body.text1,
      text2: req.body.text2,
      text3: req.body.text3,
      image: req.file.filename,
    });
    await homeDetails.save();
    return res
      .status(200)
      .json({ msg: 'Slider images create successfully', data: homeDetails });
  } catch (err) {
    console.log('server error ++++', err);
    res.status(500).send('Server error');
  }
});
//GET ALL SLIDERS
router.get('/', async (req, res) => {
  try {
    const sliders = await homeSlider.find();
    return res
      .status(200)
      .json({ msg: 'all slider images successfully', data: sliders });
  } catch (err) {
    console.log('server error ++++', err);
    res.status(500).send('Server error');
  }
});

// CREATE BROWSER PRODUCT
router.post('/product', async (req, res) => {
  try {
    const browser = new Browser({
      text: req.body.text,
      image: req.file.filename,
    });
    await browser.save();
    return res
      .status(200)
      .json({ msg: 'Browser images create successfully', data: browser });
  } catch (err) {
    console.log('server error ++++', err);
    res.status(500).send('Server error');
  }
});
// GET ALL BROWSER PRODUCTS
router.get('/products', async (req, res) => {
  try {
    const browsers = await Browser.find();
    return res
      .status(200)
      .json({ msg: 'All products fetched successfully', data: browsers });
  } catch (err) {
    console.log('server error ++++', err);
    res.status(500).send('Server error');
  }
});
// CREATE SERVICE PRODUCT
router.post('/image', async (req, res) => {
  try {
    const service = new Service({
      text: req.body.text,
      image: req.file.filename,
    });
    await service.save();
    return res
      .status(200)
      .json({ msg: 'Service images create successfully', data: service });
  } catch (err) {
    console.log('server error ++++', err);
    res.status(500).send('Server error');
  }
});

// GET ALL SERVICE
router.get('/images', async (req, res) => {
  try {
    const services = await Service.find();
    return res
      .status(200)
      .json({ msg: 'All services fetched successfully', data: services });
  } catch (err) {
    console.log('server error ++++', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
