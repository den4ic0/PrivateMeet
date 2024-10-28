const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));

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
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const User = mongoose.model('User', userSchema);
const Meeting = mongoose.model('Meeting', meetingSchema);

// Simple in-memory cache
const cache = {
  users: new Map(),
  meetings: new Map(),
};

async function createUser(userData) {
  const newUser = new User(userData);
  try {
    await newUser.save();
    console.log('User created successfully:', newUser);
    // Invalidate cache for users as new user is added
    cache.users.clear();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Throw error to indicate failure in higher-level functions if necessary.
  }
}

async function createMeeting(meetingData) {
  const newMeeting = new Meeting(meetingData);
  try {
    await newMeeting.save();
    console.log('Meeting created successfully:', newMeeting);
    // Invalidate cache for meetings as a new meeting is added
    cache.meetings.clear();
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw error; // Throw error to indicate failure in higher-level functions if necessary.
  }
}

async function addUserToMeeting(userId, meetingId) {
  try {
    // Check cache for user
    let user = cache.users.get(userId);
    if (!user) {
      user = await User.findById(userId);
      if (user) {
        cache.users.set(userId, user); // Cache the user
      }
    }

    // Check cache for meeting
    let meeting = cache.meetings.get(meetingId);
    if (!meeting) {
      meeting = await Meeting.findById(meetingId);
      if (meeting) {
        cache.meetings.set(meetingId, meeting); // Cache the meeting
      }
    }

    if (!user) {
      console.error('User not found');
      throw new Error('User not found');
    }
    if (!meeting) {
      console.error('Meeting not found');
      throw new Error('Meeting not found');
    }

    meeting.participants.push(userId);
    await meeting.save();
    console.log('User added to meeting successfully');
  } catch (error) {
    console.error('Error adding user to meeting:', error);
    throw error;
  }
}

module.exports = {
  User,
  Meeting,
  createUser,
  createMeeting,
  addUserToMeeting
};