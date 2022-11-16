const Comment = require('../models/comment');
const User = require('../models/user');
class CommentController {
    async getComment(req, res) {
        const bookId = req.params.id;
        const comments = await Comment.find({ book: bookId });
        // console.log(comments);
        res.send('get all comment');
    }

    async sendComment(req, res) {
        const { user, book, content, time } = req.body;
        const comment = new Comment();
        comment.user = user;
        comment.book = book;
        comment.content = content;
        comment.time = time;
        comment.save();
        return res.json({ status: true });
    }
}

module.exports = new CommentController();
