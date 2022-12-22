const express = require('express');
const router = express.Router();
const toursController = require('../../controllers/toursController');

router.route('/')
    .get(toursController.getAllTours)
    .post(toursController.addATour)

router.route('/:id')
    .get(toursController.getATour)

module.exports = router;