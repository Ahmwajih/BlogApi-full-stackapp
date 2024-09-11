const router = require('express').Router();

const like = require('../controllers/like');


router.route('/')
    .get(like.list)

router.route('/:id')
    .get(like.read)



module.exports = router;