const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check karna ki request ke header mein token bheja gaya hai ya nahi
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Token ko alag karna
      token = req.headers.authorization.split(' ')[1];

      // Token verify karna apni .env wali secret key se
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Token se user ki ID nikal kar database se user dhundna (password chhod kar)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Sab theek hai, ab controller (createListing) ko chalne do
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };