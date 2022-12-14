const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');

router.post('/login', userController.login); // đăng nhập
router.post('/register', userController.register); // đăng ký tk
router.post('/check-admin', userController.checkAdmin); // ktra xem admin ko
router.post('/order/:id', userController.orderBook); // Đặt sách
router.get('/cart/:id', userController.getCart); // lấy thông tin giỏ hàng ở trang giỏ hàng
router.post('/order-cancel', userController.cancelOrder); // hủy đơn hàng
router.get('/profile/:id', userController.getInfo);
router.put('/profile/edit', userController.editProfile);

module.exports = router;
