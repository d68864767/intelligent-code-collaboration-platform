// config.js

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
    // Database
    db: {
        url: process.env.DATABASE_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },

    // Server
    server: {
        port: process.env.PORT || 3000
    },

    // Authentication
    auth: {
        secret: process.env.AUTH_SECRET,
        tokenExpiry: process.env.TOKEN_EXPIRY || '24h' // default to 24 hours
    },

    // Codebase Analysis and Insights
    codeAnalysis: {
        rules: process.env.CODE_ANALYSIS_RULES
    },

    // Collaborative Code Reviews
    codeReview: {
        rules: process.env.CODE_REVIEW_RULES
    },

    // Codebase Governance
    governance: {
        rules: process.env.GOVERNANCE_RULES
    },

    // Codebase Knowledge Transfer
    knowledgeTransfer: {
        rules: process.env.KNOWLEDGE_TRANSFER_RULES
    },

    // Multi-Modal Collaboration
    collaboration: {
        rules: process.env.COLLABORATION_RULES
    },

    // Codebase Security Monitoring
    security: {
        rules: process.env.SECURITY_RULES
    },

    // Codebase Change Impact Prediction
    changeImpact: {
        rules: process.env.CHANGE_IMPACT_RULES
    },

    // Codebase Trend Analysis
    trendAnalysis: {
        rules: process.env.TREND_ANALYSIS_RULES
    },

    // Community Building Features
    community: {
        rules: process.env.COMMUNITY_RULES
    },

    // AI-Enhanced Code Documentation
    documentation: {
        rules: process.env.DOCUMENTATION_RULES
    },

    // Codebase Continuous Improvement Plans
    improvementPlan: {
        rules: process.env.IMPROVEMENT_PLAN_RULES
    },

    // Codebase Testing Strategies
    testing: {
        rules: process.env.TESTING_RULES
    },

    // Codebase Innovation Suggestions
    innovation: {
        rules: process.env.INNOVATION_RULES
    },

    // Codebase Technical Debt Assessment
    technicalDebt: {
        rules: process.env.TECHNICAL_DEBT_RULES
    },

    // Codebase Evolution Forecasting
    evolutionForecast: {
        rules: process.env.EVOLUTION_FORECAST_RULES
    }
};
