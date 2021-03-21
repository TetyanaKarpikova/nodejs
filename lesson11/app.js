/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const dotnev = require('dotenv');

dotnev.config({ path: path.join(process.cwd(), '../.env') });

const db = require('./dataBase').getInstance();

const apiRouter = require('./router/api.router');
const { PORT } = require('./config/config');

db.setModels();

const app = express();

// _connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'static')));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            text: err.message || ''
        });
});

//----------------------
app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
