class NasaController {
    constructor(nasaService) {
        this.nasaService = nasaService;
    }

    async getApod(req, res) {
        try {
            const data = await this.nasaService.fetchApod();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch APOD data' });
        }
    }

    async getMarsPhotos(req, res) {
        try {
            const data = await this.nasaService.fetchMarsPhotos();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch Mars photos' });
        }
    }

    async getNeoWs(req, res) {
        try {
            const data = await this.nasaService.fetchNeoWs();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch NEO data' });
        }
    }
}

export default NasaController;