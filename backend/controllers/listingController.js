const Listing = require('../models/Listing');

// 1. Nayi Property Add Karne Ka Function (Create)
exports.createListing = async (req, res) => {
  try {
    const { title, description, address, price, image } = req.body;

    // Database mein nayi property save karna
    // TEMPORARY FIX: req.user.id hata diya hai kyunki abhi bina login ke testing kar rahe hain
    const listing = await Listing.create({
      title,
      description,
      address,
      price,
      image,
      host: req.user.id // <-- YEH WAPAS LAGA DIYA
    });

    res.status(201).json(listing);
  } catch (error) {
    console.log("Backend Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. Saari Properties Dekhne Ka Function (Read)
exports.getListings = async (req, res) => {
  try {
    // Database se saari listings uthana aur usme 'host' (user) ka naam bhi jodna
    const listings = await Listing.find().populate('host', 'name email');
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};