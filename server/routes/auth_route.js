const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth_controllers');
const authMiddleware = require('../middleware/authMiddleware');

router.route('/login').post(controllers.login);
router.route('/register').post(controllers.register);
router.route('/user').get(authMiddleware,controllers.user);
router.route('/userexist').post(controllers.userExist);
router.route('/sendmail').post(controllers.send)
router.route('/verifymail').post(controllers.verifyEmail)
router.route('/resetpassword').post(controllers.resetPassword)

module.exports = router;

