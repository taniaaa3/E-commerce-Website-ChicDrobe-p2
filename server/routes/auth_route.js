const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth_controllers');
const authMiddleware = require('../middleware/authMiddleware');

router.route('/login').post(controllers.login);
router.route('/register').post(controllers.register);
router.route('/user').get(authMiddleware,controllers.user);

module.exports = router;

