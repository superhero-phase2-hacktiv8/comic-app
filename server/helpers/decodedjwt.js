const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

const decoded = (data) => {
    return jwt.verify(data, JWT_SECRET_KEY);
}

module.exports = decoded;