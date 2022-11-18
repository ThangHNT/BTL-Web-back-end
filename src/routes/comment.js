const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');

router.get('/get-all/:id', commentController.getComments);
router.post('/send', commentController.sendComment);

module.exports = router;
