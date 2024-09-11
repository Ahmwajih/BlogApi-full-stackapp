const router = require('express').Router();

const  auth = require('../controllers/auth');
const users = require('../controllers/users');
const blog = require('../controllers/blog');
const comment = require('../controllers/comment');
const PostViewRecord = require('../controllers/postViewRecords');
const like = require('../controllers/like');


router.use('/auth', require('./auth'));
router.use('/user', require('./users'));
router.use('/blog', require('./blog'));
// router.use('/comment', require('./comment'));
router.use('/postViewRecord', require('./postViewRecord'));
router.use('/like', require('./like'));




module.exports = router;