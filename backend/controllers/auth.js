const User = require('../models/users');
const Token = require('../models/token');
const pwEncrypt = require('../helpers/pwEncrypt');
const jwt = require('jsonwebtoken');
const setToken = require('../helpers/setToken');
require('dotenv').config();

module.exports = {
    login: async (req, res) => {
        //swagger tags
        /**
         * @swagger
         * /auth/login:
         *  post:
         *    tags:
         *      - Auth
         *    summary: Login
         *    description: Login to the application
         *    requestBody:
         *      required: true
         *      content:
         *        application/json:
         *          schema:
         *            type: object
         *            properties:
         *              email:
         *                type: string
         *              password:
         *                type: string
         *    responses:
         *      '200':
         *        description: A successful response
         */
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email: email });
            if (user && password) {
                if (user.password === pwEncrypt(password)) {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.status(200).send({
                        error: false,
                        message: 'Login success',
                        token: token,
                        jswbtoken: setToken(user),
                        email: user.email
                    });
                } else {
                    res.status(401).send({
                        error: true,
                        message: 'Wrong password'
                    });
                }
            } else {
                res.status(404).send({
                    error: true,
                    message: 'User not found'
                });
            }
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Internal server error'
            });
        }
    },

    refreshToken: async (req, res) => {
        //swagger tags
        /**
         * @swagger
         * /auth/refreshToken:
         *  post:
         *    tags:
         *      - Auth
         *    summary: Refresh Token
         *    description: Refresh Token
         *    requestBody:
         *      required: true
         *      content:
         *        application/json:
         *          schema:
         *            type: object
         *            properties:
         *              token:
         *                type: string
         *    responses:
         *      '200':
         *        description: A successful response
         */
        const { token: refreshToken } = req.body;

        if (refreshToken) {
            jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    res.status(401).send({
                        error: true,
                        message: 'Invalid token'
                    });
                } else {
                    const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.status(200).send({
                        error: false,
                        message: 'Token refreshed',
                        token: newToken
                    });
                }
            });
        } else {
            res.status(400).send({
                error: true,
                message: 'Token not found'
            });
        }
    },

    logout: async (req, res) => {
        //swagger tags
        /**
         * @swagger
         * /auth/logout:
         *  post:
         *    tags:
         *      - Auth
         *    summary: Logout
         *    description: Logout
         *    responses:
         *      '200':
         *        description: A successful response
         */
        const auth = req.headers?.authorization || null;
        const tokenkey = auth ? auth.split(' ') : null;

        if (tokenkey && tokenkey[1]) {
            try {
                // Here, we assume the client will handle token removal
                res.status(200).send({
                    error: false,
                    message: 'Logout success'
                });
            } catch (err) {
                res.status(500).send({
                    error: true,
                    message: 'Logout failed'
                });
            }
        } else {
            res.status(400).send({
                error: true,
                message: 'Token not found'
            });
        }
    }
};