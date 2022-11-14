const userRouter = require('./user.js');
const bookRouter = require('./book');
function route(app) {
    app.use('/user', userRouter);
    app.use('/book', bookRouter);

    app.use('/', (req, res) => {
        res.send('server is running');
    });
}

module.exports = route;
