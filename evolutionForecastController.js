// evolutionForecastController.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config');

// Import AI model for codebase evolution forecasting
const EvolutionForecastModel = require('./models/EvolutionForecastModel');

// Middleware for checking authentication
const checkAuth = require('./middleware/checkAuth');

// Route to get evolution forecast
router.get('/', checkAuth, async (req, res) => {
    try {
        const forecast = await EvolutionForecastModel.getForecast();
        res.json(forecast);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to update evolution forecast rules
router.put('/updateRules', checkAuth, async (req, res) => {
    try {
        const newRules = req.body.rules;
        const updatedRules = await EvolutionForecastModel.updateRules(newRules);
        res.json(updatedRules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
