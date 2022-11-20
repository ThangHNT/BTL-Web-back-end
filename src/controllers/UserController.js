const User = require('../models/user');
const bcrypt = require('bcrypt');
const Order = require('../models/order');
const Book = require('../models/book');
const Cart = require('../models/cart');

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
            let checkPassword = bcrypt.compare(password, checkAccount.password);
            if (checkPassword) {
                let user = { userId: checkAccount._id, avatar: checkAccount.avatar, account: checkAccount.account };
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

    getCart(req, res) {
        console.log(req.params);
        res.send('oke');
    }
}

module.exports = new UserController();
