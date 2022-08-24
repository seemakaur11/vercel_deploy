const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const { admin, verifyToken } = require('../../config/auth');

//@route   POST api/user
//@desc    Register route
//@access  Public

router.post(
  '/',
  [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('street_address', 'Street address is required').not().isEmpty(),
    check('suburb', 'Suburb is required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),
    check('postcode', 'Postcode is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      street_address,
      suburb,
      state,
      postcode,
      isAdmin,
    } = req.body;
    try {
      // see if user exist
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      user = new User({
        first_name,
        last_name,
        email,
        password,
        phone,
        street_address,
        suburb,
        state,
        postcode,
        isAdmin,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Create token
      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
        },
      };
      const jwttoken = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 300000,
      });
      user.token = jwttoken;
      return res.status(201).json(jwttoken);
    } catch (err) {
      console.log('server error ++++', err.message);
      res.status(500).send('Server error');
    }
  }
);

// GET ALL USER
router.get('/', (admin, verifyToken), async (req, res) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ msg: 'All users fetched successfully', data: users });
  } catch (err) {
    console.log('server error ++++', err.message);
    res.status(500).send('Server error');
  }
});
//UPDATE BY ID
router.put('/:id', (admin, verifyToken), async (req, res) => {
  try {
    const { id } = req.params;
    const updated = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      street_address: req.body.street_address,
      suburb: req.body.suburb,
      state: req.body.state,
      postcode: req.body.postcode,
    };
    const user = await User.findById(id);
    if (!user) return res.status(400).json('User does not exist');
    const updatedDetails = await User.findByIdAndUpdate(
      id,
      { $set: updated },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: 'User details update successfully', data: updatedDetails });
  } catch (err) {
    console.log('server error ++++', err.message);
    res.status(500).send('Server error');
  }
});
//DELETE BY ID
router.delete('/:id', (admin, verifyToken), async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  return res.status(200).json('User Deleted successfully');
});

// GET BY ID
router.get('/find/:id', (admin, verifyToken), async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return res.status(200).json({ msg: 'User fetched successfully', data: user });
});

module.exports = router;
