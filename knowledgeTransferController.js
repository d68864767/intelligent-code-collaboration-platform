// knowledgeTransferController.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const KnowledgeTransfer = require('./models/knowledgeTransferModel');

// Middleware for checking authentication
const checkAuth = require('./middleware/checkAuth');

// Get all knowledge transfers
router.get('/', checkAuth, async (req, res) => {
    try {
        const knowledgeTransfers = await KnowledgeTransfer.find();
        res.json(knowledgeTransfers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one knowledge transfer
router.get('/:id', checkAuth, getKnowledgeTransfer, (req, res) => {
    res.json(res.knowledgeTransfer);
});

// Create one knowledge transfer
router.post('/', checkAuth, async (req, res) => {
    const knowledgeTransfer = new KnowledgeTransfer({
        title: req.body.title,
        description: req.body.description,
        contributors: req.body.contributors,
        tags: req.body.tags
    });

    try {
        const newKnowledgeTransfer = await knowledgeTransfer.save();
        res.status(201).json(newKnowledgeTransfer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one knowledge transfer
router.patch('/:id', checkAuth, getKnowledgeTransfer, async (req, res) => {
    if (req.body.title != null) {
        res.knowledgeTransfer.title = req.body.title;
    }
    if (req.body.description != null) {
        res.knowledgeTransfer.description = req.body.description;
    }
    if (req.body.contributors != null) {
        res.knowledgeTransfer.contributors = req.body.contributors;
    }
    if (req.body.tags != null) {
        res.knowledgeTransfer.tags = req.body.tags;
    }
    try {
        const updatedKnowledgeTransfer = await res.knowledgeTransfer.save();
        res.json(updatedKnowledgeTransfer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one knowledge transfer
router.delete('/:id', checkAuth, getKnowledgeTransfer, async (req, res) => {
    try {
        await res.knowledgeTransfer.remove();
        res.json({ message: 'Deleted Knowledge Transfer' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function for getting knowledge transfer by ID
async function getKnowledgeTransfer(req, res, next) {
    let knowledgeTransfer;
    try {
        knowledgeTransfer = await KnowledgeTransfer.findById(req.params.id);
        if (knowledgeTransfer == null) {
            return res.status(404).json({ message: 'Cannot find knowledge transfer' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.knowledgeTransfer = knowledgeTransfer;
    next();
}

module.exports = router;
