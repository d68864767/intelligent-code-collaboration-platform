// improvementPlanController.js

const express = require('express');
const router = express.Router();
const User = require('./userModel');
const AI = require('./ai'); // Assuming you have an AI module that handles AI operations

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

// Get improvement plan for a user
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: 'Cannot find user' });
        }

        const improvementPlan = await AI.generateImprovementPlan(user); // Assuming AI.generateImprovementPlan returns a personalized improvement plan
        res.json(improvementPlan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update improvement plan for a user
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: 'Cannot find user' });
        }

        const updatedPlan = await AI.updateImprovementPlan(user, req.body); // Assuming AI.updateImprovementPlan updates and returns the updated improvement plan
        res.json(updatedPlan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
