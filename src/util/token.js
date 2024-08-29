const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const checkToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return false;
    }
};

const setToken = (id) => {
    if (id) {
        return jwt.sign({ id }, secretKey, { expiresIn: 28800 });
    }
    return false;
};

module.exports = {
    checkToken,
    setToken,
};
