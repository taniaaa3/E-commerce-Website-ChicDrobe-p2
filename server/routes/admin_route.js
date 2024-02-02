const express = require('express');
const route = express.Router();
const adminControllers = require('../controllers/admin_controllers');

// Dashboard screen
// Create product
// update product
// Manage users
// Manage orders
// Manage Products
// route.route('/')



// To delete user 
route.route('/deluser/:id').delete(adminControllers.delUser);

module.exports = route;