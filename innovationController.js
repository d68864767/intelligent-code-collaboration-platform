// innovationController.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Innovation = require('./models/innovationModel');

// Get all innovations
router.get('/', async (req, res) => {
    try {
        const innovations = await Innovation.find();
        res.json(innovations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one innovation
router.get('/:id', getInnovation, (req, res) => {
    res.json(res.innovation);
});

// Create one innovation
router.post('/', async (req, res) => {
    const innovation = new Innovation({
        title: req.body.title,
        description: req.body.description,
        contributor: req.body.contributor,
        status: req.body.status
    });

    try {
        const newInnovation = await innovation.save();
        res.status(201).json(newInnovation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one innovation
router.patch('/:id', getInnovation, async (req, res) => {
    if (req.body.title != null) {
        res.innovation.title = req.body.title;
    }
    if (req.body.description != null) {
        res.innovation.description = req.body.description;
    }
    if (req.body.contributor != null) {
        res.innovation.contributor = req.body.contributor;
    }
    if (req.body.status != null) {
        res.innovation.status = req.body.status;
    }
    try {
        const updatedInnovation = await res.innovation.save();
        res.json(updatedInnovation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one innovation
router.delete('/:id', getInnovation, async (req, res) => {
    try {
        await res.innovation.remove();
        res.json({ message: 'Deleted Innovation' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function for get by ID
async function getInnovation(req, res, next) {
    let innovation;
    try {
        innovation = await Innovation.findById(req.params.id);
        if (innovation == null) {
            return res.status(404).json({ message: 'Cannot find innovation' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.innovation = innovation;
    next();
}

module.exports = router;
