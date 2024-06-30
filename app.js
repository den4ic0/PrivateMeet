import { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

function App() {
    const [profiles, setProfiles] = useState([]);
    const [meetings, setMeetings] = useState([]);

    const fetchProfiles = async () => {
        try {
            const response = await axios.get(`${API_URL}/profiles`);
            setProfiles(response.data);
        } catch (error) {
            console.error("Error fetching profiles:", error);
        }
    };

    const fetchMeetings = async () => {
        try {
            const response = await axios.get(`${API_URL}/meetings`);
            setMeetings(response.data);
        } catch (error) {
            console.error("Error fetching meetings:", error);
        }
    };

    const createProfile = async (profileData) => {
        try {
            await axios.post(`${API_URL}/profiles`, profileData);
            fetchProfiles();
        } catch (error) {
            console.error("Error creating a profile:", error);
        }
    };

    const updateProfile = async (id, updatedData) => {
        try {
            await axios.put(`${API_URL}/profiles/${id}`, updatedDataSet);
            fetchProfiles();
        } catch (error) {
            console.error("Error updating the profile:", error);
        }
    };

    const deleteProfile = async (id) => {
        try {
            await axios.delete(`${API_URL}/profiles/${id}`);
            fetchProfiles();
        } catch (error) {
            console.error("Error deleting the profile:", error);
        }
    };

    const createMeeting = async (meetingData) => {
        try {
            await axios.post(`${API_URL}/meetings`, meetingData);
            fetchMeetings();
        } catch (error) {
            console.error("Error creating a meeting:", error);
        }
    };

    const updateMeeting = async (id, updatedData) => {
        try {
            await axios.put(`${API_URL}/meetings/${id}`, updatedData);
            fetchMeetings();
        } catch (error) {
            console.error("Error updating the meeting:", error);
        }
    };

    const deleteMeeting = async (id) => {
        try {
            await axios.delete(`${API_URL}/meetings/${id}`);
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