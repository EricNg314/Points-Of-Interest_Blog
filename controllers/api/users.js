const router = require('express').Router();
const { User } = require('../../models');
const {withRecaptcha} = require('../../utils/auth');

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

// Sign up route.
router.post('/', withRecaptcha, async (req, res) => {
// router.post('/', async (req, res) => {
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

      res.json({message: "Account created."}) 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Login route.
router.post('/login', async (req, res) => {
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!userData) {
      res.status(400).json({
        message: "Invalid email or password."
      })
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({
        message: "Invalid email or password."
      })
      return;
    }
      
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({message: "Account signed in."})
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Logout route.
router.post('/logout', (req, res) => {
  console.log(`${req.method}: ${req.baseUrl}`);
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});


module.exports = router;