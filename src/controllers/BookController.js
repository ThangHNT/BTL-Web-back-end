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

    getAllBook(req, res) {
        Book.find({}, (err, books) => {
            return res.json({ books });
        });
    }

    async bookDetail(req, res) {
        // console.log(req.query);
        const book = await Book.findOne({ _id: req.query.id });
        if (book) {
            return res.json({ status: true, book });
        } else {
            return res.json({ status: false });
        }
    }
}

module.exports = new BookController();
