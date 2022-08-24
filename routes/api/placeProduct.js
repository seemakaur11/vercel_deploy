const express = require('express');
const router = express.Router();
const placeProduct = require('../../models/placeProduct');
const { admin, verifyToken } = require('../../config/auth');

// create place product
router.post('/', (admin, verifyToken), async (req, res) => {
  try {
    const product = new placeProduct({
      userId: !!req.user ? req.user.id : null,
      productId: req.body.productId,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      image: req.body.image,
      quantity: req.body.quantity,
      total: req.body.total,
      created_at: new Date(),
    });
    await product.save();
    console.log('place product created ======>', product);
    return res
      .status(200)
      .json({ msg: 'Product place successfully', data: product });
  } catch (err) {
    console.log('server error ++++', err);
    res.status(500).send('Server error');
  }
});

// get product
router.get('/find/:userId', (admin, verifyToken), async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId) {
      const product = await placeProduct.findOne({ userId: userId });
      return res
        .status(200)
        .json({ msg: 'product place successfully', data: product });
    } else {
      return res.status(200).json('UserId not found');
    }
  } catch (err) {
    console.log('server error ++++', err);
    res.status(500).send('Server error');
  }
});
module.exports = router;
