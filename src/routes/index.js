const userRouter = require('./user.js');
const bookRouter = require('./book');
const evaluateRouter = require('./evaluate');

function route(app) {
    app.use('/user', userRouter);
    app.use('/book', bookRouter);
    app.use('/evaluate', evaluateRouter);

    app.use('/', (req, res) => {
        res.send('server is running');
    });
}

module.exports = route;
