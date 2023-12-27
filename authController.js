// authController.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./userModel');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Authenticate a user and return a token
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user == null) {
            return res.status(400).json({ message: 'Cannot find user' });
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ _id: user._id }, config.auth.secret, { expiresIn: config.auth.tokenExpiry });
            res.json({ token: token });
        } else {
            res.json({ message: 'Not Allowed' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to authenticate a token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, config.auth.secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.use(authenticateToken);

module.exports = router;
