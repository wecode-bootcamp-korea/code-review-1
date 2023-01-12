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

////Login (bcrypt & jwtToken)
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const userData = await myDataSource.query(
        `
            SELECT
              *
            FROM
                users
            WHERE
                email = ?`,
        [email]
    );

    if (!userData) {
        return res.status(401).json({ message: 'not Exists Users' });
    }

    const result = await bcrypt.compare(password, userData[0].password);

    if (!result) {
        return res.status(401).json({ message: 'incorrect Password' });
    }

    const payload = { email: process.env.email };
    const jwtToken = jwt.sign(payload, process.env.secretKey);

    return res.status(200).json({ accessToken: jwtToken });
});

//// Posting
app.post('/post', async (req, res) => {
    const { title, postImage, content, userId } = req.body;

    const result = await myDataSource.query(
        `
                INSERT INTO posts(
                title,
                post_image,
                content,
                user_id
            ) VALUES (
                ?, 
                ?, 
                ?, 
                ?
            );
        `,
        [title, postImage, content, userId]
    );
    res.status(201).json({ message: 'posting success!' });
});

//// Inquire all post
app.get('/post', async (req, res) => {
    const rows = await myDataSource.query(
        `
        SELECT
        u.id AS userId,
        p.id AS postId,
        p.post_image AS postingImageUrl,
        p.content AS postingContent
        FROM users u
        INNER JOIN posts p ON u.id = p.user_id;
        `,
        (err, rows) => {
            res.status(200).json({ data: rows });
        }
    );
});

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
    } catch (err) {
        console.log(err.message);
    }
};

start();
