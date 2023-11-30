'use strict'
require('dotenv').config();
const express = require('express') , router = express.Router();
const bcrypt = require('bcrypt');// for hashing passwords and comparing hashed passwords
const Student = require('../models/Student');
const verifyAndRefreshToken = require('../middleware/verification');
const {logger, logEvents} = require('../middleware/logger');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY 

//middleware
router.use('/assets', express.static('views/assets'));//Set 'assets' folder as the static folder for serving CSS
router.use('/images', express.static('views/images'));//Set 'assets' folder as the static folder for images, etc.

router.get('/generic', (req, res) => {
    res.render('generic');
});

router.get('/elements', (req, res) => {
    res.render('elements')
});
// Developer page (GET /developer)
router.get('/developers',  verifyAndRefreshToken, (req, res) => {
  res.render('developers');
});

router.get('/signup', (req, res) => {
    res.render('signup')
});   
// Register a student (POST /register)
router.post('/register', async (req, res) => {
    try {
      const { fullName, studentNumber, qualificationName, password } = req.body;
  
      // Check if the student already exists
      const existingStudent = await Student.findOne({ studentNumber });
      if (existingStudent) {
        return res.render('400');
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new student with the hashed password
      const newStudent = new Student({
        fullName,
        studentNumber,
        qualificationName,
        password: hashedPassword,
      });
  
      // Save the student to the database
      await newStudent.save();
  
      //res.status(201).json({ message: 'Student registered successfully' });
      res.redirect('login')
    } catch (error) {
      console.error(error);
      //res.status(500).json({ message: 'Internal Server Error' });
      res.redirect('signup')
    }
  });

router.get('/login', (req, res) => {
    res.render('login')
});
// Login (POST /login)
router.post('/login', async (req, res) => {
  try {
    const { fullName, password } = req.body;

    // Find the student by studentNumber
    const student = await Student.findOne({ fullName });

    if (!student) {
      return  res.render('401');
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, student.password);

    if (!passwordMatch) {
      return res.render('401');
    }

    // Generate a JWT token and refresh token
    const accessToken = jwt.sign({ student: fullName}, secretKey, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ student: fullName}, secretKey, { expiresIn: '3d' });

    // Render to the developer page with a student info
    res.render('developers',{student: student});

  } catch (error) {
    console.error(error);
    // Redirect to the index page if needed
    res.redirect('login');
  }
});

// Logout (POST /logout)
router.post('/logout', (req, res) => {
  const token = req.headers['authorization'];
  const refreshToken = req.body.refreshToken;

  if (token) {
    // Invalidate the access token by adding it to the revoked tokens list
    revokedTokens.add(token);
  }

  if (refreshToken) {
    // Invalidate the refresh token by adding it to the revoked refresh tokens list
    revokedRefreshTokens.add(refreshToken);
  }

  // Assuming you have stored fullName in the request body during login
  const fullName = req.body.fullName;

  // Logging the logout
  logEvents(`Logout\t${fullName}\t${req.headers.origin}`, 'logoutLog.log');

  res.redirect('login');
});

router.get('/BadRequest', (req, res) => {
  res.render('400');
});

router.get('/Unauthorized', (req, res) => {
  res.render('401');
});



    

module.exports = router;