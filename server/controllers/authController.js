const { User } = require('../models');
const { hashPassword } = require('../helpers/hash');
const { generateToken } = require('../helpers/generateToken');

class AuthController {
    static async login(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async loginGoogle(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController;