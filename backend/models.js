const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  bio: String,
  contact: {
    email: String,
    phone: String
  }
});
const meetingSchema = new mongoose.Schema({
  date: Date,
  time: String,
  location: String,
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});
const User = mongoose.model('User', userSchema);
const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports = {
  User,
  Meeting
};