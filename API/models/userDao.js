const { myDataSource } = require('./myDataSource');

const signUp = async (name, email, password) => {
    const result = await myDataSource.query(
        `INSERT INTO users(
            name,
            email,
            password
        ) VALUES (?, ?, ?);
        `,
        [name, email, password]
    );
    return result;
};

const getHashPassword = async (email) => {
    const hashPassword = await myDataSource.query(`SELECT password AS hashPassword FROM users WHERE email = ?;`, [
        email,
    ]);
    return hashPassword;
};

const signIn = async (email) => {
    const [userData] = await myDataSource.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return userData;
};

module.exports = {
    signUp,
    signIn,
    getHashPassword,
};
