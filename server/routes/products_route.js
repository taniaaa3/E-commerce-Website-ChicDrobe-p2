const express = require('express');
const route = express.Router();
const productsController = require('../controllers/products_controller');

route.route('/all').get(productsController.allProducts);
route.route('/redirect/:id').get(productsController.productRedirect);
route.route('/getproduct/:id').get(productsController.getProduct)
route.route('/search').post(productsController.searchProduct)
route.route('/update/:id').patch(productsController.updateProduct);
route.route('/delete/:id').delete(productsController.deleteProduct);
route.route('/gettype').get(productsController.getType);
route.route('/getsizes').get(productsController.getSizes);
route.route('/getcolors').get(productsController.getColors);
route.route('/filterproduct').post(productsController.filterProducts);
route.route('/sort').post(productsController.sort);

module.exports = route;