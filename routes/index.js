const router = require('express').Router();

const auth = require('./auth');
const users = require('./users');
const blog = require('./blog');
const comment = require('./comment');
const postViewRecord = require('./postViewRecords'); 
const like = require('./like');
const category = require('./categories');

router.use('/auth', auth);
router.use('/user', users);
router.use('/blog', blog);
router.use('/comment', comment);
router.use('/postViewRecord', postViewRecord); 
router.use('/like', like);
router.use('/category', category);

module.exports = router;