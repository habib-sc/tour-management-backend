const express = require('express');
const router = express.Router();
const toursController = require('../../controllers/toursController');

router.route('/')
    .get(toursController.getAllTours)
    .post(toursController.addATour)

module.exports = router;