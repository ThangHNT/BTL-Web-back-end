const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');

router.post('/add', bookController.addBook);

module.exports = router;
