const router = require('express').Router();
const userRoute = require('./users');
const postRoute = require('./posts');

router.use('/users', userRoute);
router.use('/posts', postRoute);

module.exports = router;