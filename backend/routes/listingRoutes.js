const express = require('express');
const router = express.Router();
const { createListing, getListings } = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');

const Listing = require('../models/Listing'); 

// Nayi property add karne ka route (Yahan 'protect' laga diya hai)
router.post('/', protect, createListing);

// Saari properties dekhne ka route (Yeh bina login sab dekh sakte hain)
router.get('/', getListings);

// DELETE property by ID (Yahan bhi 'protect' laga diya taaki bina login koi delete na kar paye)
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      return res.status(404).json({ message: "Property nahi mili" });
    }
    res.status(200).json({ message: "Property successfully delete ho gayi!" });
  } catch (error) {
    console.error("Backend Error in Delete:", error);
    res.status(500).json({ message: "Delete karne mein error", error });
  }
});

module.exports = router;