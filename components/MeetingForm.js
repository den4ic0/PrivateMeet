import React, { useState } from 'react';

const MeetingForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    date: initialData.date || '',
    time: initialData.time || '',
    location: initialData.location || '',
    participants: initialData.participants || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!formData.date) {
      formIsValid = false;
      newErrors.date = 'Date is required.';
    }

    if (!formData.time) {
      formIsValid = false;
      newErrors.time = 'Time is required.';
    }

    if (!formData.location) {
      formIsValid = false;
      newErrors.location = 'Location is required.';
    }

    if (!formData.participants) {
      formIsValid = false;
      newErrors.participants = 'Participants are required.';
    }

    setErrors(newErrors);
    return formIsValid;
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
        {errors.date && <div style={{ color: 'red' }}>{errors.date}</div>}
      </div>
      <div>
        <label>Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        {errors.time && <div style={{ color: 'red' }}>{errors.time}</div>}
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <div style={{ color: 'red' }}>{errors.location}</div>}
      </div>
      <div>
        <label>Participants</label>
        <input
          type="text"
          name="participants"
          value={formData.participants}
          onChange={handleChange}
        />
        {errors.participants && <div style={{ color: 'red' }}>{errors.participants}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MeetingForm;