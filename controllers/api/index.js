const router = require('express').Router();
const userRoute = require('./users');
const postRoute = require('./posts');
const commentRoute = require('./comments');

router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);

module.exports = router;