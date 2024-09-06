const User = require('../models/users');
const Token = require('../models/token');
const pwEncrypt = require('../helpers/pwEncrypt');
const jwt = require('jsonwebtoken');
const token = require('./token')

require('dotenv').config();

module.exports = {
    login: (req, res) => {
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
        const { email, password } = req.body

        const user = await User.findOne({ $or: [{ email: email }] })
        if (user && password) {
            if (user && user.password == pwEncrypt(password)) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
                res.send({
                    error: false,
                    message: 'Login success',
                    token: token,
                    email: user.email,
                    password: user.password
                })
            }
        }
