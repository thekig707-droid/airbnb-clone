const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Jab frontend se /signup par POST request aayegi, toh registerUser chalega
router.post('/signup', registerUser);

// Jab frontend se /login par POST request aayegi, toh loginUser chalega
router.post('/login', loginUser);

module.exports = router;