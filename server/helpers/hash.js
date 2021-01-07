const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

const comparePassword = (userPassword, dbPassword) => {
    return bcrypt.compareSync(userPassword, dbPassword);
}

module.exports = { hashPassword, comparePassword };