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
    console.log(result);
    return result;
};

module.exports = {
    signUp,
};
