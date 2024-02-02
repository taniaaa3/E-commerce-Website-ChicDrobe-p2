const express = require('express');
const route = express.Router();
const orderRoutes = require('../controllers/order_controllers');
const authMiddleware = require('../middleware/authMiddleware');

route.route('/place').post(authMiddleware, orderRoutes.place);
route.route('/cancel').post(orderRoutes.cancel);
route.route('/myorders').get(authMiddleware, orderRoutes.myOrders);
route.route('/allorders').get(authMiddleware, orderRoutes.allOrders);
route.route('/cancelorder').put(orderRoutes.cancelOrder);

module.exports = route;