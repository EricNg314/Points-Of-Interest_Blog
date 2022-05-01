const withAuth = (req, res, next) => {
  // Checking for session if logged in, else go to login.
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next()
  }
};

module.exports = withAuth;