const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const { comparePassword } = require('../helpers/hash');
const generateToken = require('../helpers/generateToken');


class AuthController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) return next({ name: 'validateLogin' })

            const checkPassword = comparePassword(password, user.password);
            if (!checkPassword) return next({ name: 'validateLogin' })

            const payload = {
                id: user.id,
                email: user.email
            }

            const access_token = generateToken(payload);

            return res.status(200).json({
                status: 'success',
                message: 'successfully login',
                id: user.id,
                fullname: user.fullname(),
                access_token
            })

        } catch (error) {
            return next(error)
        }
    }

    static async loginGoogle(req, res, next) {
        const { id_token } = req.body;
        const client = new OAuth2Client(process.env.GOOGLE_ID_TOKEN);

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_ID_TOKEN,
            });
            const payload = ticket.getPayload();
            const email = payload.email;
            const firstName = payload.given_name;
            const lastName = payload.family_name;

            let user;
            user = await User.findOne({ where: { email } });

            if (!user) {
                user = await User.create({
                    firstName,
                    lastName,
                    email,
                    password: Math.random() * 1000 + ' google random password rahasia'
                })
            }

            const payloadJwt = {
                id: user.id,
                email: user.email
            }

            const access_token = generateToken(payloadJwt);

            return res.status(201).json({
                status: 'success',
                message: 'login succesfully',
                id: user.id,
                fullname: user.fullname(),
                access_token
            })
        }
        verify().catch(err => next(err))
    }

    static async register(req, res, next) {
        try {
            const { firstName, lastName, email, password } = req.body;
            const input = { firstName, lastName, email, password };

            const data = await User.create(input)

            return res.status(201).json({
                status: 'success',
                message: 'successfully register new user',
                data
            })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = AuthController;