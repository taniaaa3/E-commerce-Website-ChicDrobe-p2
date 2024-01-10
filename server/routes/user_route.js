const express = require('express');
const route = express.Router();
const userControllers = require('../controllers/user_controllers');
const authMiddleware = require('../middleware/authMiddleware');

route.route('/user').put(userControllers.editUser);
route.route('/saveaddress').post(authMiddleware, userControllers.saveAddress);
route.route('/getaddresses').get(authMiddleware, userControllers.getAddress);
route.route('/updateaddress').patch(authMiddleware, userControllers.updateAddress);
route.route('/deleteaddress/:id').delete(userControllers.deleteAddress)

module.exports = route;