const Comment = require('../models/comment');
const User = require('../models/user');

class CommentController {
    async getComments(req, res) {
        const bookId = req.params.id;
        const comments = await Comment.find({ book: bookId });
        let users = comments.map(async (item) => {
            const user = await User.findOne({ _id: item.user });
            const data = {
                account: user.account,
                avatar: user.avatar,
                star: item.star,
                content: item.content,
                time: item.time,
            };
            return data;
        });
        const result = Promise.all(users.reverse());
        result.then((data) => {
            return res.json({ status: true, comments: data });
        });
    }

    async sendComment(req, res) {
        const { user, book, content, time, star } = req.body;
        // console.log(req.body);
        const comment = new Comment();
        comment.user = user;
        comment.book = book;
        comment.content = content;
        comment.time = time;
        comment.star = star;
        comment.save();
        return res.json({ status: true });
    }
}

module.exports = new CommentController();
