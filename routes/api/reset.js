const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

router.post(
  '/',
  [check('new_password', 'New password is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { new_password, otp } = req.body;
      const user = await User.findOne({ otp: otp });
      if (!user) return res.status(400).json({ error: 'Invalid Otp' });
      // const response = {};
      if (user) {
        let currentTime = new Date().getTime();
        console.log('current time ====>', currentTime);
        let diff = data.expireIn - currentTime;
        console.log(' diff =====>', diff);
        if (diff < 0) {
          response.message = 'Token expire';
          response.statusText = 'Error';
        }
        if (user.password) {
          const passwordMatch = await bcrypt.compare(
            new_password,
            user.password
          );
          if (passwordMatch)
            return res
              .status(400)
              .json({ errors: [{ msg: 'Cannot use a recent password' }] });
          const newPass = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
          const updateUser = await User.findByIdAndUpdate(
            { _id: user._id },
            { $set: { password: newPass, otp: '' } },
            { new: true }
          );
          console.log('updaed user ====>', updateUser);
          return res.status(200).json({
            success: true,
            msg: 'Password change successfully',
            data: updateUser,
          });
        }
      }
      // if (data) {
      //   let currentTime = new Date().getTime();
      //   console.log('current time ====>', currentTime);
      //   let diff = data.expireIn - currentTime;
      //   console.log(' diff =====>', diff);
      //   if (diff < 0) {
      //     response.message = 'Token expire';
      //     response.statusText = 'Error';
      //   } else {
      //     let user = await User.findOne({ email: email });
      //     console.log('user ------>', user);
      //     if (!user)
      //       return res
      //         .status(400)
      //         .json({ errors: [{ msg: 'Invalid email address' }] });

      //     if (user.password) {
      //       const passwordMatch = await bcrypt.compare(
      //         new_password,
      //         user.password
      //       );
      //       if (passwordMatch)
      //         return res
      //           .status(400)
      //           .json({ errors: [{ msg: 'Cannot use a recent password' }] });
      //     }
      //     user.password = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
      //     user.save();
      //     console.log(' user ====>', user);
      //     await Otp.updateOne({ otp: null });
      //     response.message = 'password change successfully';
      //     response.statusText = 'Success';
      //   }
      // }
      // else {
      //   response.message = 'Invalid Otp';
      //   response.statusText = 'Error';
      // }
    } catch (err) {
      console.log('server error ++++', err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
