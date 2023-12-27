// technicalDebtController.js

const express = require('express');
const router = express.Router();
const Codebase = require('./models/codebaseModel');
const AI = require('./ai');

// Get technical debt for a codebase
router.get('/:id', getCodebase, async (req, res) => {
    try {
        const technicalDebt = await AI.assessTechnicalDebt(res.codebase);
        res.json(technicalDebt);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function for getting codebase object by ID
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

module.exports = router;
