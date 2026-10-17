const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // NAYA IMPORT
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');

const app = express();

// YEH NAYI LINE HAI: Isse koi bhi frontend humare backend ko request bhej payega
app.use(cors()); 

app.use(express.json());

// MongoDB connection (Tumhara purana wala hi hai)
mongoose.connect('mongodb+srv://thekig707_db_user:Prakhar707@cluster0.fbgd19f.mongodb.net/?appName=Cluster0')
  .then(() => console.log('MongoDB connected! 🎉'))
  .catch((err) => console.log('MongoDB error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

// PORT ki setting (Render khud apna port dega, nahi toh 5001 chalega)
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Backend Engine running on port ${PORT} 🚀`);
});