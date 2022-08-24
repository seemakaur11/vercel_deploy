const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { admin, verifyToken } = require('../../config/auth');
const Order = require('../../models/order');

// CREATE ORDER

router.post(
  '/',
  verifyToken,
  [
    check('orderItems', 'Order items is required').not().isEmpty(),
    check('shippingAddress', 'Shipping address is required').not().isEmpty(),
    check('paymentMethod', 'Payment method is required').not().isEmpty(),
    check('itemsPrice', 'Items price is required').not().isEmpty(),
    check('taxPrice', 'Tax price is required').not().isEmpty(),
    check('shippingPrice', 'Shipping price is required').not().isEmpty(),
    check('totalPrice', 'Total price is required').not().isEmpty(),
  ],
  async (req, res) => {
    console.log('req user =====>', req.user);
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      if (orderItems && orderItems.length === 0) {
        return res.status(404).json('No order found');
      } else {
        const order = new Order({
          userId: req.user.id,
          orderItems,
          shippingAddress,
          paymentMethod,
          taxPrice,
          shippingPrice,
          totalPrice,
        });
        const createdOrder = await order.save();
        console.log(' create oprder  ===>', createdOrder);
        return res
          .status(200)
          .json({ msg: 'Order create successfully', data: createdOrder });
      }
    } catch (err) {
      console.log('server error ++++', err.message);
      res.status(500).send('Server error');
    }
  }
);

// GET ORDER BY ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    console.log(' get pffe --->', order);
    if (order) {
      return res.status(200).json();
    } else {
      return res.status(404).json('Order not found');
    }
  } catch (err) {
    console.log('server error ++++', err.message);
    res.status(500).send('Server error');
  }
});
// UPDATE ORDER BY PAYMENT
router.put('/:id/pay', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      (order.isPaid = true),
        (order.paidAt = Date.now()),
        (order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        });
      const updatedOrder = await order.save();
      console.log('update order =====>', updatedOrder);
      return res
        .status(200)
        .json({ msg: 'Update order successfully', data: updatedOrder });
    } else {
      return res.status(404).json('Order not found');
    }
  } catch (err) {
    console.log('server error ++++', err.message);
    res.status(500).send('Server error');
  }
});

//UPDATE ORDER TO DELIVERED
router.put('/:id/deliver', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      console.log('update order ------>', updatedOrder);
      return res.status(200).json({
        msg: 'Update order delivered successfully',
        data: updatedOrder,
      });
    } else {
      return res.status(404).json('Order not found');
    }
  } catch (err) {
    console.log('server error ++++', err.message);
    res.status(500).send('Server error');
  }
});

//GET ORDER BY LOGGED IN USERS
router.get('/', (admin, verifyToken), async (req, res) => {
  const orders = await Order.find({});
  console.log('all orders ---->', orders);
  return res
    .status(200)
    .json({ msg: 'All Orders fetch successfully', data: orders });
});

// GET MY ORDER BY LOGGED IN USERS
router.get('/myorders', (admin, verifyToken), async (req, res) => {
  const myOrders = await Order.find({ userId: req.user.id });
  console.log('my orders ======>', myOrders);
  return res
    .status(200)
    .json({ msg: 'My order fetch successfully', data: myOrders });
});

// UPDATE ORDER BY ID
router.put('/update/:id', (admin, verifyToken), async (req, res) => {
  try {
    const { id } = req.params;
    // const order = await Order.findById(req.params.id);
    const updateOrder = {
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    };
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: updateOrder,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: 'Order update successfully', data: updatedOrder });
  } catch (err) {
    console.log('server error ++++', err.message);
    res.status(500).send('Server error');
  }
});
//DELETE ORDER BY ID
router.delete('/:id', (admin, verifyToken), async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json('Order has been deleted...');
});

module.exports = router;
