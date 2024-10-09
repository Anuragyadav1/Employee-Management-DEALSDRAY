// src/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hardcoded admin credentials
const ADMIN_USERNAME = 'Anurag';
const ADMIN_PASSWORD = 'Anurag123'; 

// @desc    Login user & get token
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  // console.log("Username: ", username);
  // console.log("Password: ", password);
  
  try {
    // Check for admin login
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ userId: ADMIN_USERNAME, role: 'admin' }, process.env.JWT_SECRET);
      return res.json({ token, user: { username: ADMIN_USERNAME, role: 'admin' } });
    }

    // Logic for regular user login
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token, user: { username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
