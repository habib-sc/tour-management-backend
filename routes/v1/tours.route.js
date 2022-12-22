const express = require('express');
const router = express.Router();
const toursController = require('../../controllers/toursController');
const { tourViewCount } = require('../../middlewear/tourViewCount');

router.route('/')
    .get(toursController.getAllTours)
    .post(toursController.addATour)

router.route('/trending')
    .get(toursController.getTrendingTours)

router.route('/cheapest')
    .get(toursController.getCheapestTours)

router.route('/:id')
    .get(tourViewCount, toursController.getATour)
    .patch(toursController.updateATour)

module.exports = router;