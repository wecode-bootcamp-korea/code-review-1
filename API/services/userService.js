const userDao = require('../models/userDao');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (name, email, password) => {
    // password validation using REGEX
    // const pwValidation = new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})');

    // if (!pwValidation.test(password)) {
    //     const err = new Error('PASSWORD_IS_NOT_VALID');
    //     err.statusCode = 409;
    //     throw err;
    // }

    const saltRounds = 12;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const signUp = await userDao.signUp(name, email, hashPassword);

    return signUp;
};

module.exports = {
    signUp,
};
