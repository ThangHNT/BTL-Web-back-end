const express = require('express');
const router = express.Router();

const settingController = require('../controllers/SettingController');

router.post('/api/get-setting', settingController.getTheme); // lấy dữ liệu đã cài đặt trong đoạn chat
router.post('/api/change-theme', settingController.changeTheme); // thay đổi chủ đề đoạn chat

module.exports = router;
