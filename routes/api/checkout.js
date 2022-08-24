const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
  'sk_test_51JeYHHSEH5sbunfA2Qayuopo46s98UH899HZDUxaCMJImbdH2ZH4gP3Qx1AKmsLEH3vNaBn8NKEAnIrkh2WQzjN900MrOGHw1H'
);
const { v4: uuidv4 } = require('uuid');
const Checkout = require('../../models/checkout');
const crypto = require('crypto');

// payment
router.post('/', async (req, res) => {
  const id = crypto.randomBytes(10).toString('hex');
  try {
    const { product, token } = req.body;
    const key = uuidv4();
    await stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create(
          {
            amount: product.total * 100,
            currency: 'INR',
            customer: customer.id,
            receipt_email: token.email,
            description: 'All products description',
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey: key }
        );
      })
      .then((result) => {
        res.status(200).json(result);
      });
    const checkoutInfo = new Checkout({
      userId: product.userId ? product.userId : null,
      orderId: id,
      product: {
        productId: product.productId,
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        price: product.price,
        total: product.total,
      },
      shipping: {
        name: token.card.name,
        address: {
          address1: token.card.address_line1,
          address2: token.card.address_line2,
          city: token.card.address_city,
          state: token.card.address_state,
          countery: token.card.address_country,
          postal_code: token.card.address_zip,
        },
      },
    });

    await checkoutInfo.save();
  } catch (error) {
    console.log('error ====>', error);
  }
  //return res.json({ status: status });
});
module.exports = router;
