const Evaluate = require('../models/evaluate');
const User = require('../models/user');

class EvaluateController {
    async getEvaluate(req, res) {
        const bookId = req.params.id;
        const evaluates = await Evaluate.find({ book: bookId });
        let users = evaluates.map(async (item) => {
            const user = await User.findOne({ _id: item.user });
            const data = {
                account: user.account,
                avatar: user.avatar,
                star: item.star,
                comment: item.comment,
            };
            return data;
        });
        const result = Promise.all(users.reverse());
        result.then((data) => {
            return res.json({ status: true, comments: data });
        });
    }

    async sendEvaluate(req, res) {
        const { user, book, comment, time, star } = req.body;
        // console.log(req.body);
        const evaluate = new Evaluate();
        evaluate.user = user;
        evaluate.book = book;
        evaluate.comment = comment;
        evaluate.time = time;
        evaluate.star = star;
        evaluate.save();
        return res.json({ status: true });
    }
}

module.exports = new EvaluateController();
