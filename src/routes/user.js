const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');

router.post('/login', userController.login);

module.exports = router;
