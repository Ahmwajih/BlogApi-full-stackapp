const router = require('express').Router();

const  auth = require('../controllers/auth');
const users = require('../controllers/users');


router.use('/auth', require('./auth'));
router.use('/user', require('./users'));



module.exports = router;