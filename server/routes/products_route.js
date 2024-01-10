const express = require('express');
const route = express.Router();
const productsController = require('../controllers/products_controller');

route.route('/all').get(productsController.allProducts);
route.route('/redirect/:id').get(productsController.productRedirect);

module.exports = route;