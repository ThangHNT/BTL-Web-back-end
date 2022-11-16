const userRouter = require('./user.js');
const bookRouter = require('./book');
const commentRouter = require('./comment');

function route(app) {
    app.use('/user', userRouter);
    app.use('/book', bookRouter);
    app.use('/comment', commentRouter);

    app.use('/', (req, res) => {
        res.send('server is running');
    });
}

module.exports = route;
