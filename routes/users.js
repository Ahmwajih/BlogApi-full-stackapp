const router = require('express').Router();

const users = require('../controllers/users');

router.get('/', users.list);
router.get('/:id', users.read);
router.post('/', users.create);
router.put('/:id', users.update);
router.delete('/:id', users.delete);

module.exports = router;
