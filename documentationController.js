// documentationController.js

const express = require('express');
const router = express.Router();
const Documentation = require('./models/documentationModel');
const AI = require('./ai');

// Get all documentations
router.get('/', async (req, res) => {
    try {
        const documentations = await Documentation.find();
        res.json(documentations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one documentation
router.get('/:id', getDocumentation, (req, res) => {
    res.json(res.documentation);
});

// Create one documentation
router.post('/', async (req, res) => {
    const documentation = new Documentation({
        codebaseId: req.body.codebaseId,
        content: req.body.content
    });

    try {
        const newDocumentation = await documentation.save();
        res.status(201).json(newDocumentation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one documentation
router.patch('/:id', getDocumentation, async (req, res) => {
    if (req.body.codebaseId != null) {
        res.documentation.codebaseId = req.body.codebaseId;
    }

    if (req.body.content != null) {
        res.documentation.content = req.body.content;
    }

    try {
        const updatedDocumentation = await res.documentation.save();
        res.json(updatedDocumentation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one documentation
router.delete('/:id', getDocumentation, async (req, res) => {
    try {
        await res.documentation.remove();
        res.json({ message: 'Deleted Documentation' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function for get by ID
async function getDocumentation(req, res, next) {
    let documentation;

    try {
        documentation = await Documentation.findById(req.params.id);
        if (documentation == null) {
            return res.status(404).json({ message: 'Cannot find documentation' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.documentation = documentation;
    next();
}

module.exports = router;
