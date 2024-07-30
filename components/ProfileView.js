import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ProfileView = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/profiles`);
        setProfiles(response.data);
      } catch (error) {
        setError('Failed to fetch profiles. Please try again later.');
        console.error(error);
      }
    };
    fetchProfiles();
  }, []);

  const handleProfileInteract = async (profileId, actionType) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/profiles/interact`, { profileId, actionType });
      console.log(response.data);
      alert('Interaction successful.');
    } catch (error) {
      setError('Failed to interact with the profile. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="profile-view-container">
      {error && <p className="error">{error}</p>}
      <div className="profiles-list">
        {profiles.length ? (
          profiles.map(profile => (
            <div key={profile.id} className="profile-item">
              <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
              <h3>{profile.name}</h3>
              <button onClick={() => handleProfileInteract(profile.id, 'like')}>Like</button>
              <button onClick={() => handleProfileInteract(profile.id, 'dislike')}>Dislike</button>
            </div>
          ))
        ) : (
          <p>No profiles found. Please check back later.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileView;