const router = require('express').Router();

const homeRoute = require('./page-routes/home');

router.use('/', homeRoute);

module.exports = router;