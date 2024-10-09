const express = require('express');
const { login, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', login);

// @route   GET /api/auth/profile
// @desc    Get logged-in user's profile
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
