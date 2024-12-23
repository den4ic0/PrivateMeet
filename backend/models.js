const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  bio: String,
  contact: {
    email: { type: String, required: true },
    phone: String
  },
  isDeleted: { type: Boolean, default: false } // Soft delete
}, { timestamps: true }); // Auto-manage createdAt and updatedAt timestamps

const meetingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: String,
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isDeleted: { type: Boolean, default: false } // Soft delete
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Meeting = mongoose.model('Meeting', meetingSchema);

const cache = {
  users: new Map(),
  meetings: new Map(),
};

async function createUser(userData) {
  const newUser = new User(userData);
  try {
    await newUser.save();
    cache.users.clear(); // Clearing cache to ensure fresh data is fetched post creation
    console.log('User created successfully:', newUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw new Error('Failed to create user');
  }
}

async function createMeeting(meetingData) {
  const newMeeting = new Meeting(meetingData);
  try {
    await newMeeting.save();
    cache.meetings.clear(); // Clearing cache for similar reasons as above
    console.log('Meeting created successfully:', newMeeting);
  } catch (error) {
    console.error('Error creating meeting:', error.message);
    throw new Error('Failed to create meeting');
  }
}

async function addUserToMeeting(userId, meetingId) {
  try {
    let user = cache.users.get(userId) ?? await User.findOne({ _id: userId, isDeleted: false });
    let meeting = cache.meetings.get(meetingId) ?? await Meeting.findOne({ _id: meetingId, isDeleted: false });

    if (!user || user.isDeleted) {
      console.error('User not found or deleted');
      throw new Error('User not found or deleted');
    }
    if (!meeting || meeting.isDeleted) {
      console.error('Meeting not found or deleted');
      throw new Error('Meeting not found or deleted');
    }

    // Cache data for future uses if not already cached
    if (!cache.users.get(userId)) cache.users.set(userId, user); 
    if (!cache.meetings.get(meetingId)) cache.meetings.set(meetingId, meeting);

    meeting.participants.push(userId);
    await meeting.save();
    console.log('User added to meeting successfully.');
  } catch (error) {
    console.error('Error adding user to meeting:', error.message);
    throw new Error('Failed to add user to meeting');
  }
}

async function searchUser(criteria) {
  try {
    const results = await User.find({
      $or: [{ name: new RegExp(criteria, 'i') }, { 'contact.email': new RegExp(criteria, 'i') }],
      isDeleted: false
    });
    return results;
  } catch (error) {
    console.error('Error searching user:', error.message);
    throw new Error('Failed to search users');
  }
}

module.exports = {
  User,
  Meeting,
  createUser,
  createMeeting,
  addUserToMeeting,
  searchUser // Exposing the search functionality
};