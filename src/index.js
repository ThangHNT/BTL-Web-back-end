const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const route = require('./routes/index');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
require('dotenv').config();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '100mb' }));

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/chat');
        console.log('Connect database successfully');
    } catch (err) {
        console.log('connect database failed');
    }
}

connect();

route(app);

app.listen(PORT, () => {
    console.log(`App listen on http://localhost:${PORT}`);
});
