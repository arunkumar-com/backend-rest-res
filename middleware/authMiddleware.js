const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes middleware
const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  console.log('🔒 protect – Authorization header:', header);

  let token;
  if (header && header.startsWith('Bearer')) {
    token = header.split(' ')[1];

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      console.log('🔒 protect – Loaded req.user:', {
        id: req.user._id,
        isAdmin: req.user.isAdmin
      });

      return next();
    } catch (err) {
      console.error('🔒 protect – Token verify error:', err.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  console.log('🔒 protect – No token present');
  return res.status(401).json({ message: 'Not authorized, no token' });
};

// Admin middleware to restrict routes to admins only
const admin = (req, res, next) => {
  console.log('⚙️ admin – req.user.isAdmin:', req.user?.isAdmin);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  console.log('⚙️ admin – Access denied for user:', req.user?._id);
  return res.status(403).json({ message: 'Access denied: Admins only' });
};

module.exports = { protect, admin };
