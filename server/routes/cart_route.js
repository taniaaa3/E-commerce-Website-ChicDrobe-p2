const express = require('express');
const route = express.Router();
const cartControllers = require('../controllers/cart_controllers');
const authMiddleware = require('../middleware/authMiddleware');

// To get products in cart
route.route('/get').get(authMiddleware, cartControllers.getCart);

// To add products in cart
route.route('/add/:id').post(authMiddleware, cartControllers.addToCart);

// To delete products from cart
route.route('/remove').delete(cartControllers.deleteProductFromCart);

// To empty the cart
route.route('/update').patch(authMiddleware, cartControllers.updateQuantity);

// To check whether a product exists in cart or not
route.route('/checkcart/:id').get(authMiddleware, cartControllers.checkInCart);

module.exports = route;