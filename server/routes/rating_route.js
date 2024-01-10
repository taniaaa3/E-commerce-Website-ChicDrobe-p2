const express = require('express');
const route = express.Router();
const ratingController = require('../controllers/rating_controller');

route.route('/:id').post(ratingController.updateRating);

module.exports = route;