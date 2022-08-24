const jwt = require('jsonwebtoken');
const config = require('config');

const verifyToken = (req, res, next) => {
  //GET token from header
  const token = req.header('x-auth-token');
  // check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token,authorization denied' });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'), {
      expiresIn: 300000,
    });
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// exports.isAdmin = (req, res, next) => {
//   console.log(' req user ====>', req.body.isAdmin);
//   // verifyToken(req, res, () => {
//   if (req.body.isAdmin) {
//     next();
//   } else {
//     res.status(403).json('You are not alowed to do that!');
//   }
//   // });
// };
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json('Not Authorized as an admin');
  }
};
module.exports = { verifyToken, admin };
