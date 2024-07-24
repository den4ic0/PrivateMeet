import React, { useState, useEffect } from 'react';

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    bio: '',
    contactInfo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.name || !profile.age || !profile.gender || !profile.bio || !profile.contactInfo) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await saveProfile(profile);
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Failed to save profile", error);
      alert("Failed to save profile!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" value={profile.name} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" name="age" type="text" value={profile.age} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" value={profile.gender} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" name="bio" value={profile.bio} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="contactInfo">Contact Information:</label>
        <input id="contactHook" name="contactInfo" type="text" value={profile.contactInfo} onChange={handleChange} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

const saveProfile = async (profile) => {
  console.log("Saving profile", profile);
};

export default ProfileElement;