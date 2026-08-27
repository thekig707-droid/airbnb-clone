const express = require('express');
const router = express.Router();
const { createListing, getListings } = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');

// Nayi property add karne ka route (is par protect middleware lagaya hai taaki sirf login user add kar sake)
router.post('/', protect, createListing);

// Saari properties dekhne ka route (yeh koi bhi dekh sakta hai)
router.get('/', getListings);

module.exports = router;