const User = require('../models/users');
const Token = require('../models/token');
const pwEncrypt = require('../helpers/pwEncrypt');
const jwt = require('jsonwebtoken');
const token = require('./token');
const setToken = require('./token');
require('dotenv').config();

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
        const { email, password } = req.body

        const user = await User.findOne({ $or: [{ email: email }] })
        if (user && password) {
            if (user && user.password == pwEncrypt(password)) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
                res.send({
                    error: false,
                    message: 'Login success',
                    token: token,
                    jswbtoken: setToken(user),
                    email: user.email,
                    password: user.password
                })
            } else {
                res.send({
                    error: true,
                    message: 'Wrong password'
                })
            }
        } else {
            res.send({
                error: true,
                message: 'User not found'
            })
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
        const refreshToken = req.body?.bearer.refresh
        if (refreshToken) {
            await jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    res.send({
                        error: true,
                        message: 'Invalid token'
                    })
                } else {
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    res.send({
                        error: false,
                        message: 'Token refreshed',
                        token: token
                    })
                }
            })  
        } else {
            res.send({
                error: true,
                message: 'Token not found'
            })
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
        await Token.findOneAndDelete({ token: tokenkey[1] }, (err, data) => {
          if (err) {
            res.send({
              error: true,
              message: 'Logout failed'
            })
          } else {
            res.send({
              error: false,
              message: 'Logout success'
            })
          }
        })
      } else {
        res.send({
          error: true,
          message: 'Token not found'
        })
      }
    }
    }
