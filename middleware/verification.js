'use strict'
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY 



// Middleware to verify and refresh the token
const verifyAndRefreshToken = async (req, res, next) => {
  //console.log('Headers:', req.headers); for debugging
  const token = req.headers['authorization'];
  //console.log('Token:', token); for debugging

  if (!token) {
    return  res.render('status/401');
  }

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      // If the token is expired, attempt to refresh it
      if (err.name === 'TokenExpiredError') {
        const refreshToken = req.headers['refresh-token'];

        if (!refreshToken) {
          return  res.render('status/401');
        }

        jwt.verify(refreshToken, secretKey, async (refreshErr, refreshDecoded) => {
          if (refreshErr) {
            return  res.render('status/401');
          }

          // Generate a new access token
          const newAccessToken = jwt.sign({ student: refreshDecoded.student }, secretKey, { expiresIn: '1h' });

          // Set the new token in the response header
          res.setHeader('Authorization', newAccessToken);

          // Continue with the request
          next();
        });
      } else {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
    } else {
      // Token is valid, continue with the request
      next();
    }
  });
};

module.exports = verifyAndRefreshToken;