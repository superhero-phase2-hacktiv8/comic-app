const { User } = require('../models');
const decoded = require('../helpers/decodedjwt')


const isLogin = async(req, res, next) => {
    try {
        const data = decoded(req.headers.access_token);
        const user = User.findOne({ where: { email: data.email } });

        if (!user) return next({ name: 'validateLogin' })

        req.user = data;
        return next();
    } catch (error) {
        next(error)
    }
}

module.exports = isLogin;