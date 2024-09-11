const router = require('express').Router();
const postViewRecords = require('../controllers/postViewRecords');


router.route('/')
    .get(postViewRecords.list)
    .post(postViewRecords.create);


router.route('/:id')
    .get(postViewRecords.read)
    .put(postViewRecords.update)
    .delete(postViewRecords.delete);


module.exports = router;