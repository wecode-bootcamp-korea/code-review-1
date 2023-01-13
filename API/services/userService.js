const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 12;

//// 회원가입
const signUp = async (name, email, password) => {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    await userDao.signUp(name, email, hashPassword);
};

const signIn = async (email, password) => {
    const userData = await userDao.signIn(email);
    const result = await bcrypt.compare(password, userData.password);
    const jwtToken = jwt.sign(userData.id, process.env.SECRET_KEY);
    return { result, jwtToken };
};

module.exports = {
    signUp,
    signIn,
};
