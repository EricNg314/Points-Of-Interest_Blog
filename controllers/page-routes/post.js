const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('createPost', {
    loggedIn: req.session.loggedIn
  })
})


module.exports = router;