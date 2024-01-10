const express = require('express');
const route = express.Router();
const wishlistControllers = require('../controllers/wishlist_controllers');
const authMiddleware = require('../middleware/authMiddleware');

route.route('/add/:id').get(authMiddleware, wishlistControllers.addWishlist);
route.route('/remove').delete(wishlistControllers.removeWishlist);
route.route('/get').get(authMiddleware, wishlistControllers.getWishlist);
route.route('/check/:id').get(authMiddleware, wishlistControllers.checkWishlist)

module.exports = route;