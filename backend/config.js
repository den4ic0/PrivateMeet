const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000,
};

mongoose.connect(mongoDB, options).catch((err) => console.error('Initial MongoDB connection error:', err));

const db = mongoose.connection;

db.on('connecting', () => {
  console.log('Attempting to connect to MongoDB...');
});

db.on('connected', () => {
  console.log('MongoDB connection successful');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  mongoose.disconnect();
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected! Attempting to reconnect...');
  mongoose.connect(mongoDB, options).catch((err) => console.error('MongoDB reconnection error:', err));
});

db.on('reconnected', () => {
  console.log('MongoDB reconnected successfully');
});

let initialConnection = false;

db.once('open', () => {
  if (!initialConnection) {
    console.log('MongoDB initial connection open');
    initialConnection = true;
  }
});

module.exports = db;