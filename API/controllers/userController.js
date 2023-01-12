const userService = require('../services/userService');

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name);

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'KEY_ERROR',
            });
        }

        await userService.signUp(name, email, password);
        return res.status(201).json({
            message: 'SIGNUP_SUCCESS',
        });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({
            message: 'SIGNUP_ERROR',
        });
    }
};

module.exports = {
    signUp,
};
