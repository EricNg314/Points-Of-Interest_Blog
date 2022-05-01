const router = require('express').Router();
const { User } = require('../../models');

// get all users
router.get('/', async (req, res) => {
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    const userData = await User.findAll({
      attributes: { 
        exclude: ['password'] 
      }
    })
    res.json(userData)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json(userData);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;