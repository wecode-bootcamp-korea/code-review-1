require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcrypt');

const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
});

myDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch(() => {
        console.log('Promise Reected!');
    });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

/// health check
app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

//// Sign up
app.post('/signUp', async (req, res) => {
    const { name, email, password } = req.body;
    const saltRounds = 12;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashPassword);
    const result = await myDataSource.query(
        `
        INSERT INTO users(
        name,
        email,
        password
        ) VALUES (?, ?, ?);
        `,
        [name, email, hashPassword]
    );

    res.status(201).json({ data: result[0] });
});

//// Post
app.post('/post', async (req, res) => {
    const { title, postImage, content, userId } = req.body;

    const result = await myDataSource.query(
        `
        INSERT INTO posts(
        title,
        post_image,
        content,
        user_id
        ) VALUES (?, ?, ?, ?);
        `,
        [title, postImage, content, userId]
    );

    res.status(201).json({ message: 'user Created' });
});

app.listen(PORT, function () {
    `listening on port ${PORT}`;
});
