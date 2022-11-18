const Book = require('../models/book');
const Order = require('../models/order');

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

    async orderBook(req, res) {
        const { book, customer, receiver, phoneNumber, email, quantity, address, date } = req.body;
        const order = new Order();
        order.book = book;
        order.customer = customer;
        order.receiver = receiver;
        order.email = email;
        order.address = address;
        order.quantity = quantity;
        order.phoneNumber = phoneNumber;
        order.date = date;
        order.save();
        const thisBook = await Book.findOne({ _id: book });
        thisBook.quantity = thisBook.quantity - quantity;
        thisBook.save();
        return res.json({ status: true });
    }
}

module.exports = new BookController();
