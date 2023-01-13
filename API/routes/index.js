const express = require('express');
const router = express.Router();

const userRouter = require('./userRoutes');
const postRouter = require('./postRoutes');

router.use('/users', userRouter.router);
router.use('/posts', postRouter.router);

module.exports = router;
