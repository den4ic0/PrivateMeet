import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MeetingItem = ({ meeting, onJoin }) => (
  <div className="meeting-item">
    <h3>{meeting.title}</h3>
    <p>{meeting.date}</p>
    <button onClick={() => onJoin(meeting.id)}>Join Meeting</button>
  </div>
);

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);

  const handleJoinMeeting = (meetingId) => {
    console.log(`Joining meeting with ID: ${meetingId}`);
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      try {
        const response = await axios.get(`${apiUrl}/meetings`);
        setMeetings(response.data);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="meeting-list">
      {meetings.map((meeting) => (
        <MeetingItem key={meeting.id} meeting={meeting} onJoin={handleJoinMeeting} />
      ))}
    </div>
  );
};

export default MeetingList;