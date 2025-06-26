const express = require('express');
const NasaController = require('../controllers/nasaController');

const router = express.Router();
const nasaController = new NasaController();

function setNasaRoutes(app) {
    router.get('/apod', nasaController.getApod.bind(nasaController));
    router.get('/mars-photos', nasaController.getMarsPhotos.bind(nasaController));
    router.get('/neo-ws', nasaController.getNeoWs.bind(nasaController));

    app.use('/api/nasa', router);
}

module.exports = setNasaRoutes;