// codebaseController.js

const express = require('express');
const router = express.Router();
const Codebase = require('./models/codebaseModel');
const AI = require('./ai');

// Get all codebases
router.get('/', async (req, res) => {
    try {
        const codebases = await Codebase.find();
        res.json(codebases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one codebase
router.get('/:id', getCodebase, (req, res) => {
    res.json(res.codebase);
});

// Create one codebase
router.post('/', async (req, res) => {
    const codebase = new Codebase({
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        contributors: req.body.contributors
    });

    try {
        const newCodebase = await codebase.save();
        res.status(201).json(newCodebase);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one codebase
router.patch('/:id', getCodebase, async (req, res) => {
    if (req.body.name != null) {
        res.codebase.name = req.body.name;
    }
    if (req.body.description != null) {
        res.codebase.description = req.body.description;
    }
    if (req.body.code != null) {
        res.codebase.code = req.body.code;
    }
    if (req.body.contributors != null) {
        res.codebase.contributors = req.body.contributors;
    }

    try {
        const updatedCodebase = await res.codebase.save();
        res.json(updatedCodebase);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one codebase
router.delete('/:id', getCodebase, async (req, res) => {
    try {
        await res.codebase.remove();
        res.json({ message: 'Deleted Codebase' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function for get by ID
async function getCodebase(req, res, next) {
    let codebase;
    try {
        codebase = await Codebase.findById(req.params.id);
        if (codebase == null) {
            return res.status(404).json({ message: 'Cannot find codebase' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.codebase = codebase;
    next();
}

// AI-powered code analysis
router.post('/analyze', async (req, res) => {
    try {
        const analysis = await AI.analyzeCode(req.body.code);
        res.json(analysis);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
