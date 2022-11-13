const userRouter = require('./user.js');
function route(app) {
    app.use('/user', userRouter);

    app.use('/', (req, res) => {
        res.send('server is running');
    });
}

module.exports = route;
