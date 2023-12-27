// codeReviewController.js

const express = require('express');
const router = express.Router();
const CodeReview = require('./codeReviewModel');
const User = require('./userModel');
const AI = require('./aiModel'); // Assuming you have an AI model that handles AI operations

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

// Create a new code review
router.post('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: 'Cannot find user' });
        }

        const aiRecommendations = await AI.analyzeCode(req.body.code); // Assuming AI.analyzeCode returns AI recommendations

        const codeReview = new CodeReview({
            code: req.body.code,
            user: user._id,
            aiRecommendations: aiRecommendations
        });

        const newCodeReview = await codeReview.save();
        res.status(201).json(newCodeReview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all code reviews
router.get('/', authenticateToken, async (req, res) => {
    try {
        const codeReviews = await CodeReview.find();
        res.json(codeReviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific code review
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const codeReview = await CodeReview.findById(req.params.id);
        if (!codeReview) {
            return res.status(404).json({ message: 'Cannot find code review' });
        }
        res.json(codeReview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a code review
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const codeReview = await CodeReview.findById(req.params.id);
        if (!codeReview) {
            return res.status(404).json({ message: 'Cannot find code review' });
        }

        if (req.body.code != null) {
            codeReview.code = req.body.code;
        }

        const updatedCodeReview = await codeReview.save();
        res.json(updatedCodeReview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a code review
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const codeReview = await CodeReview.findById(req.params.id);
        if (!codeReview) {
            return res.status(404).json({ message: 'Cannot find code review' });
        }

        await codeReview.remove();
        res.json({ message: 'Deleted Code Review' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
