const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const { check, validationResult } = require('express-validator/check');
const { admin, verifyToken } = require('../../config/auth');

//CREATE PRODUCT
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    // check('image', 'Image is required').not().isEmpty(),
  ],
  (admin, verifyToken),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: req.file.filename,
        userId: req.user.id,
        quantity: req.body.quantity,
        total: req.body.total,
      });
      await product.save();
      return res
        .status(200)
        .json({ msg: 'product created successfully', data: product });
    } catch (err) {
      console.log('server error ++++', err);
      res.status(500).send('Server error');
    }
  }
);
//GET PRODUCT BY ID
router.get('/find/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // const user = new User.findById(id)
    const product = await Product.findById(id);

    if (!product) return res.status(400).json({ data: 'Product not found' });

    return res.send({ msg: 'Product fetch successfully', data: product });
  } catch (err) {
    console.log('server error ++++', err.message);
    res.status(500).send('Server error');
  }
});
//UPDATE PRODUCT
router.put(
  '/:id',
  // [
  //   check('name', 'Name is required').not().isEmpty(),
  //   check('category', 'Category is required').not().isEmpty(),
  //   check('price', 'Price is required').not().isEmpty(),
  //  check('image', 'Image is required').not().isEmpty(),
  // ],
  async (req, res) => {
    try {
      const { id } = req.params;
      let updateProduct = {
        // name: req.body.name,
        // category: req.body.category,
        // price: req.body.price,
        quantity: req.body.quantity,
        total: req.body.total,
      };
      const product = await Product.findById(id);
      if (!product) return res.status(400).json({ error: 'Product not found' });

      if (product) {
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { $set: updateProduct },
          { new: true }
        );
        return res
          .status(200)
          .json({ msg: 'Product update successfully', data: updatedProduct });
      } else {
        return res.send('Product not found');
      }
    } catch (err) {
      console.log('server error ++++', err.message);
      res.status(500).send('Server error');
    }
  }
);

//DELETE PRODUCT
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const delProduct = await Product.findByIdAndDelete(id);
    if (delProduct) {
      return res.status(200).json({ msg: 'Product delete successfully' });
    }
    if (!delProduct) {
      return res.status(200).json({ msg: 'Product not found' });
    }
  } catch (err) {
    console.log('server error ++++', err.message);
    res.status(500).send('Server error');
  }
});
//FIND ALL PRODUCT
router.get('/', async (req, res) => {
  const products = await Product.find();
  return res
    .status(200)
    .json({ msg: 'All products fetched successfully', data: products });
});
//FETCH PRODUCTS BY SEARCH QUERY
// router.get('/', async (req, res) => {
//   const { search } = req.query;
//   const products = await Product.find({ name: { $search: search } });
//   console.log('products ====>', products);
//   return res
//     .status(200)
//     .json({ msg: 'Search  products fetched successfully', data: products });
// });

router.get('/filter', async (req, res) => {
  try {
    const { name, category, filter, keyword } = req.query;
    const search = {
      category: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    };
    if (name) {
      const productByName = await Product.find({
        $or: [{ name: { $regex: name } }],
      });
      return res
        .status(200)
        .json({ msg: 'product fetched successfully', data: productByName });
    } else if (category) {
      const productByCategory = await Product.find({
        $or: [{ category: { $regex: category } }],
      });
      return res
        .status(200)
        .json({ msg: 'product fetched successfully', data: productByCategory });
    }
    if (filter) {
      switch (filter) {
        case 'lowprice':
          const productByHighPrice = await Product.find({}).sort('price');
          res.json({
            msg: 'product fetched successfully',
            data: productByHighPrice,
          });
          break;
        case 'highprice':
          const productbyLowPrice = await Product.find({})
            .sort('-price')
            .exec();
          res.json({
            msg: 'product fetched successfully',
            data: productbyLowPrice,
          });
          break;
        case 'popularity':
          const productByPopuarity = await Product.find({})
            .sort('createdAt')
            .exec();
          res.json({
            msg: 'product fetched successfully',
            data: productByPopuarity,
          });
          break;
        default:
          break;
      }
    } else {
      const product = await Product.find(search);
      res.send({ data: product });
    }
  } catch (err) {
    console.log('server error ++++', err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
