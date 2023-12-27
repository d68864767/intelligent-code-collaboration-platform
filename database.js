// database.js

const mongoose = require('mongoose');
const config = require('./config');

// Database connection
mongoose.connect(config.db.url, config.db.options);
const db = mongoose.connection;

db.on('error', (error) => console.error('Database Connection Error: ', error));
db.once('open', () => console.log('Connected to Database'));

module.exports = db;
