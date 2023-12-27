// collaborationController.js

const express = require('express');
const router = express.Router();
const Collaboration = require('./collaborationModel');
const config = require('./config');
const authMiddleware = require('./authMiddleware');

// Middleware for checking authentication
router.use(authMiddleware);

// Get all collaborations
router.get('/', async (req, res) => {
    try {
        const collaborations = await Collaboration.find();
        res.json(collaborations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific collaboration
router.get('/:id', getCollaboration, (req, res) => {
    res.json(res.collaboration);
});

// Create a new collaboration
router.post('/', async (req, res) => {
    const collaboration = new Collaboration({
        title: req.body.title,
        description: req.body.description,
        participants: req.body.participants,
        codebase: req.body.codebase,
        messages: req.body.messages
    });

    try {
        const newCollaboration = await collaboration.save();
        res.status(201).json(newCollaboration);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a collaboration
router.patch('/:id', getCollaboration, async (req, res) => {
    if (req.body.title != null) {
        res.collaboration.title = req.body.title;
    }
    if (req.body.description != null) {
        res.collaboration.description = req.body.description;
    }
    if (req.body.participants != null) {
        res.collaboration.participants = req.body.participants;
    }
    if (req.body.codebase != null) {
        res.collaboration.codebase = req.body.codebase;
    }
    if (req.body.messages != null) {
        res.collaboration.messages = req.body.messages;
    }
    try {
        const updatedCollaboration = await res.collaboration.save();
        res.json(updatedCollaboration);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a collaboration
router.delete('/:id', getCollaboration, async (req, res) => {
    try {
        await res.collaboration.remove();
        res.json({ message: 'Deleted Collaboration' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function for getting collaboration by ID
async function getCollaboration(req, res, next) {
    let collaboration;
    try {
        collaboration = await Collaboration.findById(req.params.id);
        if (collaboration == null) {
            return res.status(404).json({ message: 'Cannot find collaboration' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.collaboration = collaboration;
    next();
}

module.exports = router;
