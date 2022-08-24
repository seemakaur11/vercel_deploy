const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");
const nodemailer = require("nodemailer");

//@route   POST api/forget
//@desc    Authenticate user & forget password
//@access  Public

router.post(
  "/",
  [check("email", "Please include a valid email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    //find user
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({
            errors: [
              {
                msg: "There does not appear to be an existing account matching that email address.",
              },
            ],
          });
      }
      if (user) {
        let otp = Math.floor(1000 + Math.random() * 9000);
        // let otpData = new Otp({
        //   email: email,
        //   otp: otp,
        //   expireIn: new Date().getTime() + 300 * 1000,
        // });
        let resData = await User.updateOne(
          { email: email },
          { $set: { otp: otp, expireIn: new Date().getTime() + 300 * 1000 } }
        );
        console.log("res data =====>", resData);
        mailer(email, otp);
        return res
          .status(201)
          .json({ msg: "Otp send successfully Please check your email" });
      }
    } catch (err) {
      console.log("server error ++++", err.message);
      res.status(500).send("Server error");
    }
  }
);
const mailer = (email, otp) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: "465",
    auth: {
      user: "raiseema248@gmail.com",
      pass: "bjdkyenjrakwodli",
    },
  });
  const mailOptions = {
    from: "raiseema248@gmail.com",
    to: email,
    subject: "Please Reset your Password",
    html: `
         <h3>OTP: <b>${otp}</b></h3
    <h3>Dear User</h3><p>You requested for reset password, kindly use this <a href="http://localhost:5000/api/reset-password">link</a> to reset your password</p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error in nodemailer", error);
    } else {
      console.log("Email sent", +info.response);
    }
  });
};
module.exports = router;
