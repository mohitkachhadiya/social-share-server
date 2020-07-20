var express = require('express');

var userController = require('../controllers/user.controller');

var router = express.Router();

router.post('/login', userController.login);
router.post('/sign-up', userController.signUp);
router.get('/get-user-by-id/:id', userController.getUserById);

module.exports = router;

