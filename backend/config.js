const mongoose = require('mongoose');
require('dotenv').config();
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection successful'))
    .catch((err) => console.error('MongoDB connection error:', err));
module.exports = mongoose.connection;