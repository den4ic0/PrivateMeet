import { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

function App() {
    const [profiles, setProfiles] = useState([]);
    const [profilesCache, setProfilesCache] = useState({});
    const [meetings, setMeetings] = useState([]);
    const [meetingsCache, setMeetingsCache] = useState({});

    const fetchProfiles = async () => {
        if (!profilesCache['data']) {
            try {
                const response = await axios.get(`${API_URL}/profiles`);
                setProfiles(response.data);
                setProfilesCache({ data: response.data });
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        } else {
            setProfiles(profilesCache['data']);
        }
    };

    const fetchMeetings = async () => {
        if (!meetingsCache['data']) {
            try {
                const response = await axios.get(`${API_URL}/meetings`);
                setMeetings(response.data);
                setMeetingsCache({ data: response.data });
            } catch (error) {
                console.error("Error fetching meetings:", error);
            }
        } else {
            setMeetings(meetingsCache['data']);
        }
    };

    const createProfile = async (profileData) => {
        try {
            await axios.post(`${API_URL}/profiles`, profileData);
            setProfilesCache({}); // Invalidate cache
            fetchProfiles();
        } catch (error) {
            console.error("Error creating a profile:", error);
        }
    };

    const updateProfile = async (id, updatedData) => {
        try {
            await axios.put(`${API_URL}/profiles/${id}`, updatedData);
            setProfilesCache({}); // Invalidate cache
            fetchProfiles();
        } catch (error) {
            console.error("Error updating the profile:", error);
        }
    };

    const deleteProfile = async (id) => {
        try {
            await axios.delete(`${API_URL}/profiles/${id}`);
            setProfilesCache({}); // Invalidate cache
            fetchProfiles();
        } catch (error) {
            console.error("Error deleting the profile:", error);
        }
    };

    const createMeeting = async (meetingData) => {
        try {
            await axios.post(`${API_URL}/meetings`, meetingData);
            setMeetingsCache({}); // Invalidate cache
            fetchMeetings();
        } catch (error) {
            console.error("Error creating a meeting:", error);
        }
    };

    const updateMeeting = async (id, updatedData) => {
        try {
            await axios.put(`${API_URL}/meetings/${id}`, updatedData);
            setMeetingsCache({}); // Invalidate cache
            fetchMeetings();
        } catch (error) {
            console.error("Error updating the meeting:", error);
        }
    };

    const deleteMeeting = async (id) => {
        try {
            await axios.delete(`${API_URL}/meetings/${id}`);
            setMeetingsCache({}); // Invalidate cache
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