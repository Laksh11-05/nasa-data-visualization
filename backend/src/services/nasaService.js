class NasaService {
    constructor() {
        this.apiKey = process.env.NASA_API_KEY; // Ensure to set your NASA API key in environment variables
        this.baseUrl = 'https://api.nasa.gov';
    }

    async fetchApod() {
        try {
            const response = await axios.get(`${this.baseUrl}/planetary/apod?api_key=${this.apiKey}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching APOD data: ' + error.message);
        }
    }

    async fetchMarsPhotos(rover, sol) {
        try {
            const response = await axios.get(`${this.baseUrl}/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${this.apiKey}`);
            return response.data.photos;
        } catch (error) {
            throw new Error('Error fetching Mars photos: ' + error.message);
        }
    }

    async fetchNeoWs(startDate, endDate) {
        try {
            const response = await axios.get(`${this.baseUrl}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${this.apiKey}`);
            return response.data.near_earth_objects;
        } catch (error) {
            throw new Error('Error fetching NEO data: ' + error.message);
        }
    }
}

export default NasaService;