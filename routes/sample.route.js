const express = require('express');
const router = express.Router();
const sampleControler = require('../controllers/sample.controller');

router.route('/')
    .get(sampleControler.getItemSample)

module.exports = router;