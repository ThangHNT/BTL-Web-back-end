const Book = require('../models/book');

class BookController {
    addBook(req, res) {
        const { title, author, releaseDate, description, category, coverImage, numberOfPage } = req.body;
        const book = new Book();
        book.title = title;
        book.author = author;
        book.releaseDate = releaseDate;
        book.description = description;
        book.category = category;
        book.coverImage = coverImage;
        book.numberOfPage = numberOfPage;
        book.save();
        return res.json({ status: true });
    }
}

module.exports = new BookController();
