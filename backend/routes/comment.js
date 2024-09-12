const express = require('express');
const router = express.Router();

const Comment = require('../controllers/comment');

router.route('/')
    .get(Comment.list)
    .post(Comment.create);

router.route('/:id')
    .get(Comment.read)
    .put(Comment.update)
    .delete(Comment.delete);



module.exports = router;