import { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

function App() {
    const [profiles, setProfiles] = useState([]);
    const [meetings, setMeetings] = useState([]);

    const fetchData = async (endpoint, stateSetter, cacheName) => {
        const cacheData = sessionStorage.getItem(cacheName);
        if (cacheData) {
            stateSetter(JSON.parse(cacheData));
        } else {
            try {
                const response = await axios.get(`${API_URL}/${endpoint}`);
                stateSetter(response.data);
                sessionStorage.setItem(cacheName, JSON.stringify(response.data)); // Cache the data
            } catch (error) {
                console.error(`Error fetching ${endpoint}:`, error);
            }
        }
    };

    const invalidateCache = (cacheName) => {
        sessionStorage.removeItem(cacheName);
    };

    const fetchProfiles = () => fetchData('profiles', setProfiles, 'profilesCache');
    const fetchMeetings = () => fetchData('meetings', setMeetings, 'meetingsCache');

    const createProfile = async (profileData) => {
        try {
            await axios.post(`${API_URL}/profiles`, profileData);
            invalidateCache('profilesCache'); // Invalidate cache
            fetchProfiles();
        } catch (error) {
        console.error("Error creating a profile:", error);
        }
    };

    const updateProfile = async (id, updatedData) => {
        try {
            await axios.put(`${API_URL}/profiles/${id}`, updatedData);
            invalidateCache('profilesCache'); // Invalidate cache
            fetchProfiles();
        } catch (error) {
            console.error("Error updating the profile:", error);
        }
    };

    const deleteProfile = async (id) => {
        try {
            await axios.delete(`${API_SFRA_URL}/profiles/${id}`);
            invalidateCache('profilesCache'); // Invalidate cache
            fetchProfiles();
        } catch (error) {
            console.error("Error deleting the profile:", error);
        }
    };

    const createMeeting = async (meetingData) => {
        try {
            await axios.post(`${API_URL}/meetings`, meetingData);
            invalidateCache('meetingsCache'); // Invalidate cache
            fetchMeetings();
        } catch (error) {
            console.error("Error creating a meeting:", error);
        }
    };

    const updateMeeting = async (id, updatedData) => {
        try {
            await axios.put(`${API_URL}/meetings/${id}`, updatedData);
            invalidateCache('meetingsCache'); // Invalidate cache
            fetchMeetings();
        } catch (error) {
            console.error("Error updating the meeting:", error);
        }
    };

    const deleteMeeting = async (id) => {
        try {
            await axios.delete(`${API_URL}/meetings/${id}`);
            invalidateCache('meetingsCache'); // Invalidate cache
            fetchMeetings();
        } catch (error) {
            console.error("Error deleting the meeting:", error);
        }
    };

    useEffect(() => {
        fetchProfiles();
        fetchMeetings();
    }, []);

    return (
        <div className="App">
        </div>
    );
}

export default App;