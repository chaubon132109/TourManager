const express = require('express');
const tourController = require('../../app/controllers/tour.controller')
const route = express.Router();
route
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour)
route
    .route('/:id')
    .get(tourController.getTour)
    .delete(tourController.deleteTour)
    .patch(tourController.updateTour)
module.exports = route;