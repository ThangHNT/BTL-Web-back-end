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

    async editBook(req, res) {
        // console.log(req.body);
        const { title, author, releaseDate, description, category, coverImage, numberOfPage, price, quantity } =
            req.body;
        const book = await Book.findOne({ _id: req.params.id });
        if (book) {
            book.title = title;
            book.price = price;
            book.quantity = quantity;
            book.author = author;
            book.description = description;
            book.category = category;
            book.releaseDate = releaseDate;
            book.coverImage = coverImage;
            book.numberOfPage = numberOfPage;
            book.save();
            res.json({ status: true });
        } else {
            res.json({ status: false });
        }
    }

    deleteBook(req, res) {
        // console.log(req.params);
        Book.deleteOne({ _id: req.params.id }, function (err, book) {
            return res.json({ status: true });
        });
    }

    async searchBook(req, res) {
        let results = [];
        let searchString = req.body.searchValue.toLowerCase();
        let searchStringArr = searchString.split(' ');
        const books = await Book.find({});
        books.forEach((book) => {
            let title = book.title.toLowerCase();
            let result = {
                title: book.title,
                author: book.author,
                bookId: book._id,
            };
            if (title.startsWith(searchStringArr[0])) {
                results.push(result);
            } else {
                searchStringArr.forEach((item) => {
                    if (title.search(item) >= 0) {
                        results.push(result);
                    }
                });
            }
        });
        return res.json({ status: true, results });
    }

    searchUser(req, res) {
        let name = req.query.q;
        const exceptionuser = req.query.exceptUser;
        let listUser = [];
        User.find({}, function (err, users) {
            users.forEach((user) => {
                const arr = name.split(' ');
                const data = {
                    username: user.username,
                    avatar: user.avatar,
                    userId: user._id,
                };
                if (arr.length == 1 && user.username.startsWith(name) && user._id != exceptionuser) {
                    listUser.push(data);
                } else {
                    for (let i = 0; i < arr.length; i++) {
                        if (user.username.indexOf(arr[i]) > -1 && user._id != exceptionuser) {
                            listUser.push(data);
                            break;
                        }
                    }
                }
            });
            if (listUser.length > 0) {
                return res.json({ status: true, listUser });
            } else {
                return res.json({ status: false, msg: 'ko co nguoi dung trong he thong' });
            }
        });
    }
}

module.exports = new BookController();
