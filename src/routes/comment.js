const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');

router.get('/get-all/:id', commentController.getComment);

module.exports = router;
