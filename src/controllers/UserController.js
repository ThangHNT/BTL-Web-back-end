const User = require('../models/user');
const bcrypt = require('bcrypt');
const Order = require('../models/order');
const Book = require('../models/book');
const Cart = require('../models/cart');
const book = require('../models/book');
const cart = require('../models/cart');

class UserController {
    async register(req, res, next) {
        const { account, password, email, phoneNumber, avatar } = req.body;
        // console.log(req.body);
        let checkAccount, checkEmail;
        checkAccount = await User.findOne({ account });
        if (checkAccount) return res.json({ status: false, msg: 'Tai khoan da ton tai' });
        checkEmail = await User.findOne({ email });
        if (checkEmail) return res.json({ status: false, msg: 'Email da duoc dang ky' });
        const hashPw = await bcrypt.hash(password, 10);
        const user = new User();
        user.account = account;
        user.email = email;
        user.password = hashPw;
        user.phoneNumber = phoneNumber;
        const cart = new Cart();
        cart.user = user._id;
        cart.save();
        avatar
            ? (user.avatar = avatar)
            : (user.avatar =
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png');
        user.save();
        const newUser = {
            account,
            userId: user._id,
            avatar: user.avatar,
        };
        return res.json({ status: true, newUser });
    }

    async login(req, res) {
        const { account, password } = req.body;
        let checkAccount = await User.findOne({ account });
        if (checkAccount) {
            let checkPassword = await bcrypt.compare(password, checkAccount.password);
            // console.log(checkPassword);
            if (checkPassword) {
                let user;
                user = { userId: checkAccount._id, avatar: checkAccount.avatar, account: checkAccount.account };
                if (checkAccount.admin) {
                    user.admin = true;
                }
                return res.json({ status: true, user });
            } else {
                return res.json({ status: false, msg: 'Tài khoản hoặc mật khẩu không đúng' });
            }
        } else {
            return res.json({ status: false, msg: 'Tài khoản hoặc mật khẩu không đúng' });
        }
    }

    async checkAdmin(req, res) {
        const { userId } = req.body;
        let checkAdminUser = await User.findOne({ _id: userId });
        if (checkAdminUser.admin) {
            return res.json({ status: true });
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
        if (thisBook.quantity < 0) thisBook.quantity = 0;
        thisBook.save();

        const cart = await Cart.findOne({ user: customer });
        let existBook = cart.books.some((item) => item == book);
        if (!existBook) {
            cart.books.push(book);
            cart.save();
        }

        return res.json({ status: true });
    }

    async getCart(req, res) {
        let userId = req.params.id;
        const cart = await Cart.findOne({ user: userId });
        // console.log(cart);
        let books = cart.books.map(async (item) => {
            let book = await Book.findOne({ _id: item });
            let bookInfo = {
                bookId: book._id,
                author: book.author,
                coverImage: book.coverImage,
                price: book.price,
                title: book.title,
                deleted: book.deleted,
            };
            let ordering = await Order.find({ book: item, customer: userId });
            let purchaseHistory = [];
            ordering.forEach((item) => {
                let orderingDetail = {
                    orderId: item._id,
                    receiver: item.receiver,
                    phoneNumber: item.phoneNumber,
                    address: item.address,
                    quantity: item.quantity,
                    totalPrice: Number(item.quantity) * Number(book.price),
                    date: item.date,
                };
                purchaseHistory.push(orderingDetail);
            });
            // console.log(purchaseHistory);
            let data = { bookInfo, purchaseHistory };
            return data;
        });
        books = Promise.all(books);
        books.then((data) => {
            // data: trả về mảng sách đã mua gồm bookInfo (thông tin về sách) và
            // purchaseHistory : mảng danh order sách, nếu 1 cuốn đặt 1 lần sẽ có 1 ptu, 1 cuốn đặt nhiều lần sẽ
            // có nhiều ptu.
            // console.log(data[0].purchaseHistory);
            res.json({ status: true, data });
        });
    }

    async cancelOrder(req, res) {
        // console.log(req.body);
        const { orderId } = req.body;
        await Order.deleteOne({ _id: orderId });
        res.json({ status: true });
    }

    getInfo(req, res) {
        // console.log(req.params);
        User.findOne({ _id: req.params.id }, (err, data) => {
            let user = {
                userId: data._id,
                avatar: data.avatar,
                account: data.account,
                email: data.email,
                phoneNumber: data.phoneNumber,
            };
            return res.json({ status: true, user });
        });
    }

    async editProfile(req, res) {
        const { userId, phoneNumber, avatar, email, password, newPassword, oldPassword } = req.body.profile;
        let user = await User.findOne({ _id: userId });
        if (password) {
            let checkPassword = await bcrypt.compare(oldPassword, user.password);
            if (checkPassword) {
                let hash = await bcrypt.hash(newPassword, 10);
                user.password = hash;
            } else {
                return res.json({ status: false, msg: 'Mật khẩu không đúng' });
            }
        }
        user.avatar = avatar;
        user.phoneNumber = phoneNumber;
        user.email = email;
        user.save();
        return res.json({ status: true, msg: 'Đã cập nhật thông tin tài khoản' });
    }
}

module.exports = new UserController();
