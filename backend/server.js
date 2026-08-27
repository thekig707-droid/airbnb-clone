const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// 1. Yahan authRoutes ko require kiya hai
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// 2. Yahan frontend se aane wale routes ko connect kiya hai
app.use('/api/auth', authRoutes);
app.use('/api/listings', require('./routes/listingRoutes'));
// MongoDB Database se connect karne ka code
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Database se connection successful ho gaya! 🎉'))
  .catch((err) => console.log('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('Airbnb Backend is Working with Database!');
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});  