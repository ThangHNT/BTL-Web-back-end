const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/check-admin', userController.checkAdmin);
router.post('/order/:id', userController.orderBook);
router.get('/cart/:id', userController.getCart);

module.exports = router;
