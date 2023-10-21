const router = require('express').Router();

const user = require('./userAPI');
const thought = require('./thoughtAPI');
const reaction = require('./reactionAPI');

router.use('/user', user);
router.use('/thought', thought);
router.use('/reaction', reaction);

module.exports = router;