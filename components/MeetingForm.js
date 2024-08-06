import React, { useState } from 'react';

const MeetingForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    date: initialData.date || '',
    time: initialData.time || '',
    location: initialData.location || '',
    participants: initialData.participants || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { date, time, location, participants } = formData;
    if (!date || !time || !location || !participants) {
      alert('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Participants</label>
        <input
          type="text"
          name="participants"
          value={formData.participants}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MeetingForm;