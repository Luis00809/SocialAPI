const router = require('express').Router();

const user = require('./userAPI');

router.use('/user', user);

module.exports = router;