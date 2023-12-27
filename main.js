// main.js

// Importing necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importing controllers
const authController = require('./authController');
const codeReviewController = require('./codeReviewController');
const codebaseController = require('./codebaseController');
const collaborationController = require('./collaborationController');
const securityController = require('./securityController');
const knowledgeTransferController = require('./knowledgeTransferController');
const communityController = require('./communityController');
const documentationController = require('./documentationController');
const improvementPlanController = require('./improvementPlanController');
const testingController = require('./testingController');
const innovationController = require('./innovationController');
const technicalDebtController = require('./technicalDebtController');
const evolutionForecastController = require('./evolutionForecastController');

// Routes
app.use('/auth', authController);
app.use('/codeReview', codeReviewController);
app.use('/codebase', codebaseController);
app.use('/collaboration', collaborationController);
app.use('/security', securityController);
app.use('/knowledgeTransfer', knowledgeTransferController);
app.use('/community', communityController);
app.use('/documentation', documentationController);
app.use('/improvementPlan', improvementPlanController);
app.use('/testing', testingController);
app.use('/innovation', innovationController);
app.use('/technicalDebt', technicalDebtController);
app.use('/evolutionForecast', evolutionForecastController);

// Importing server configuration
const config = require('./config');

// Start server
const port = config.server.port;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
