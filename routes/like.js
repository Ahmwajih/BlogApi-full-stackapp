const router = require('express').Router();

const like = require('../controllers/like');


router.route('/')
    .get(like.list)
    .post(like.create);

router.route('/:id')
    .get(like.read)
    .put(like.update)
    .delete(like.delete);


module.exports = router;