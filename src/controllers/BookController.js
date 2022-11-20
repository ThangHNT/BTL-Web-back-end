const Book = require('../models/book');
const Order = require('../models/order');
const Cart = require('../models/cart');

class BookController {
    addBook(req, res) {
        const { title, author, releaseDate, description, category, coverImage, numberOfPage, price, quantity } =
            req.body;
        const book = new Book();
        book.title = title;
        book.author = author;
        book.releaseDate = releaseDate;
        book.description = description;
        book.category = category;
        book.coverImage = coverImage;
        book.numberOfPage = numberOfPage;
        book.price = price;
        book.quantity = quantity;
        book.save();
        return res.json({ status: true });
    }

    getAllBook(req, res) {
        Book.find({}, (err, books) => {
            return res.json({ books });
        });
    }

    async bookDetail(req, res) {
        // console.log(req.params);
        const book = await Book.findOne({ _id: req.params.id });
        if (book) {
            return res.json({ status: true, book });
        } else {
            return res.json({ status: false });
        }
    }
}

module.exports = new BookController();
