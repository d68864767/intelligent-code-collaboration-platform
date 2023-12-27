const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

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

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

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

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
