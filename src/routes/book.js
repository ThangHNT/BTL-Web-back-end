const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');

router.post('/add', bookController.addBook);
router.get('/get/all-book', bookController.getAllBook);
router.get('/detail/:id', bookController.bookDetail);
router.put('/edit/:id', bookController.editBook);
router.delete('/delete/:id', bookController.deleteBook);
router.post('/search', bookController.searchBook);

module.exports = router;
