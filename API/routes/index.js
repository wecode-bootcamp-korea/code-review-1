const express = require('express');
const router = express.Router();

const userRouter = require('./userRoutes');

router.use('/users', userRouter.router);

module.exports = router;
