// testingController.js

const express = require('express');
const router = express.Router();
const Test = require('./models/testModel');
const AI = require('./ai');

// Get all tests
router.get('/', async (req, res) => {
    try {
        const tests = await Test.find();
        res.json(tests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one test
router.get('/:id', getTest, (req, res) => {
    res.json(res.test);
});

// Create one test
router.post('/', async (req, res) => {
    const test = new Test({
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        results: req.body.results
    });

    try {
        const newTest = await test.save();
        res.status(201).json(newTest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one test
router.patch('/:id', getTest, async (req, res) => {
    if (req.body.name != null) {
        res.test.name = req.body.name;
    }
    if (req.body.description != null) {
        res.test.description = req.body.description;
    }
    if (req.body.code != null) {
        res.test.code = req.body.code;
    }
    if (req.body.results != null) {
        res.test.results = req.body.results;
    }
    try {
        const updatedTest = await res.test.save();
        res.json(updatedTest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one test
router.delete('/:id', getTest, async (req, res) => {
    try {
        await res.test.remove();
        res.json({ message: 'Deleted Test' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function for get by ID
async function getTest(req, res, next) {
    let test;
    try {
        test = await Test.findById(req.params.id);
        if (test == null) {
            return res.status(404).json({ message: 'Cannot find test' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.test = test;
    next();
}

module.exports = router;
