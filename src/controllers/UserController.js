const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserController {
    home(req, res, next) {
        res.send('server running');
    }

    async register(req, res, next) {
        const { account, password, email } = req.body;
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
        user.save();
        const newUser = {
            account,
            userid: user._id,
        };
        return res.json({ status: true, newUser });
    }

    async login(req, res) {
        const { account, password } = req.body;
    }
}

module.exports = new UserController();
