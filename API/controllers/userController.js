const userService = require('../services/userService');

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'KEY_ERROR' });
        }

        await userService.signUp(name, email, password);
        return res.status(201).json({ message: 'SIGNUP_SUCCESS' });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: 'SIGNUP_ERROR' });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            return res.status(400).json({ message: 'KEY_ERROR' });
        }

        const { result, jwtToken } = await userService.signIn(email, password);

        if (!result) {
            return res.status(401).json({ message: 'INVALID_USER' });
        }
        return res.status(200).json({ accessToken: jwtToken });
    } catch (err) {
        console.log(err);
        return res.status(er.statusCode || 500).json({ message: err.message });
    }
};

module.exports = {
    signUp,
    signIn,
};
