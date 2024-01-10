const express = require('express');
const contactController = require('../controllers/contact_controller');
const router = express.Router();

router.route('/contact').post(contactController);

module.exports = router;