// communityController.js

const express = require('express');
const router = express.Router();
const User = require('./userModel');
const authenticateToken = require('./authController').authenticateToken;

// Middleware function to authenticate a token
router.use(authenticateToken);

// Get community leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const users = await User.find().sort({ contributions: -1 }).limit(10);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user's contributions
router.get('/contributions/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user == null) {
            return res.status(400).json({ message: 'Cannot find user' });
        }
        res.json({ contributions: user.contributions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update user's contributions
router.put('/contributions/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user == null) {
            return res.status(400).json({ message: 'Cannot find user' });
        }
        user.contributions += req.body.contributions;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
