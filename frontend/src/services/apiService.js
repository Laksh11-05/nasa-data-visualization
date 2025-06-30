import axios from 'axios';

//const API_URL = 'http://localhost:5001/api/nasa'; // old
const API_BASE_URL = "https://nasa-data-visualization-backend.onrender.com/api/nasa"; // add /api/nasa

// Astronomy Picture of the Day (APOD)
export const getApod = async (date) => {
    try {
        const params = date ? { date } : {};
        const response = await axios.get(`${API_BASE_URL}/apod`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching APOD:', error);
        throw error;
    }
};

// Mars Rover Photos
export const getMarsPhotos = async (rover, sol) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/mars-photos`, {
            params: { rover, sol }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Mars photos:', error);
        throw error;
    }
};

// Earth Polychromatic Imaging Camera (EPIC)
export const getEpic = async (date) => {
    try {
        const params = date ? { date } : {};
        const response = await axios.get(`${API_BASE_URL}/epic`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching EPIC data:', error);
        throw error;
    }
};

// Near Earth Object Web Service (NeoWs)
export const getNeoWs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/neo`);
        return response.data;
    } catch (error) {
        console.error('Error fetching NEO data:', error);
        throw error;
    }
};

// NASA Image and Video Library
export const searchNasaImages = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/images`, {
            params: { q: query }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching NASA images:', error);
        throw error;
    }
};