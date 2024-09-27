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

async function createUser(userData) {
  const newUser = new User(userData);
  try {
    await newUser.save();
    console.log('User created successfully:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

async function createMeeting(meetingData) {
  const newMeeting = new Meeting(meetingData);
  try {
    await newMeeting.save();
    console.log('Meeting created successfully:', newMeeting);
  } catch (error) {
    console.error('Error creating meeting:', error);
  }
}

async function addUserToMeeting(userId, meetingId) {
  try {
    const meeting = await Meeting.findById(meetingId);
    meeting.participants.push(userId);
    await meeting.save();
    console.log('User added to meeting successfully');
  } catch (error) {
    console.error('Error adding user to meeting:', error);
  }
}

module.exports = {
  User,
  Meeting,
  createUser,
  createMeeting,
  addUserToMeeting
};

createUser({ name: 'Jane Doe', age: 30, gender: 'Female', bio: 'Bio of Jane Doe', contact: { email: 'jane@example.com', phone: '1234567890' }});
createMeeting({ date: new Date(), time: '14:00', location: 'New York', participants: [] });
addUserToMeeting('UserIdHere', 'MeetingIdHere');