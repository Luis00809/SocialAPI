const router = require('express').Router();

const userRoutes = require('./User-Routes');
const thoughtRoutes = require('./Thoughts-routes');
const apiRoutes = require('./api');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);
router.use('/api', apiRoutes);

module.exports = router;