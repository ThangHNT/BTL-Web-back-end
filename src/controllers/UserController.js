const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserController {
    home(req, res, next) {
        res.send('server running');
    }
}

module.exports = new UserController();
