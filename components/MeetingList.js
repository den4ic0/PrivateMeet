import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MeetingItem = ({ meetingDetails, onJoinMeeting }) => (
  <div className="meeting-item">
    <h3>{meetingDetails.title}</h3>
    <p>{meetingDetails.date}</p>
    <button onClick={() => onJoinMeeting(meetingDetails.id)}>Join Meeting</button>
  </div>
);

const MeetingList = () => {
  const [meetingArray, setMeetingArray] = useState([]);

  const joinMeetingHandler = (meetingId) => {
    console.log(`Joining meeting with ID: ${meetingId}`);
  };

  useEffect(() => {
    const fetchAllMeetings = async () => {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      try {
        const response = await axios.get(`${apiUrl}/meetings`);
        setMeetingArray(response.data);
      } catch (error) {
        console.error('Failed to fetch meetings:', error);
      }
    };

    fetchAllMeetings();
  }, []);

  return (
    <div className="meeting-list">
      {meetingArray.map((singleMeeting) => (
        <MeetingItem key={singleMeeting.id} meetingDetails={singleMeeting} onJoinMeeting={joinMeetingHandler} />
      ))}
    </div>
  );
};

export default MeetingList;