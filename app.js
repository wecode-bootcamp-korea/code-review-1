require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const router = require('./API/routes');

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(router);

/// health check
app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' });
});

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
    } catch (err) {
        console.log(err.message);
    }
};

start();
