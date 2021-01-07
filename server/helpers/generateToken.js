const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, JWT_ACCESS_TOKEN_EXPIRED } = process.env;

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED })
}

module.exports = generateToken;