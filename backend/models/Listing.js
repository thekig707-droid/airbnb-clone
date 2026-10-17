const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true // Property ka naam (jaise: "Beautiful Beachhouse")
  },
  description: { 
    type: String, 
    required: true // Property ki details
  },
  address: { 
    type: String, 
    required: true // Location
  },
  price: { 
    type: Number, 
    required: true // Ek raat ka kiraya
  },
  image: { 
    type: String, 
    default: "https://via.placeholder.com/400" // Agar koi photo na daale toh yeh default photo lag jayegi
  },
  host: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: false // <-- Isko false kiya taaki bina login chal jaye
  }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);