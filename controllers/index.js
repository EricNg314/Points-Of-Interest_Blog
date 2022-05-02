const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./page-routes/home');
const dashboardRoutes = require('./page-routes/dashboard');
const postRoutes = require('./page-routes/post');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/posts', postRoutes);
router.use('/api', apiRoutes);

module.exports = router;