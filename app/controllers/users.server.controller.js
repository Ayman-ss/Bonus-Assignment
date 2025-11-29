// Handles signup, signin, and signout using sessions

const User = require('../models/user.server.model');

// GET /signup
exports.showSignup = (req, res) => {
  res.render('users/signup', { title: 'Create account' });
};

// POST /signup
exports.signup = async (req, res, next) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password // keeping it simple for the course
    });

    await user.save();

    // Log them in right away
    req.session.user = {
      id: user._id,
      username: user.username,
      firstName: user.firstName
    };

    res.redirect('/items');
  } catch (err) {
    next(err);
  }
};

// GET /signin
exports.showSignin = (req, res) => {
  res.render('users/signin', { title: 'Sign in' });
};

// POST /signin
exports.signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user || user.password !== req.body.password) {
      // For now I’m just re-rendering with a tiny error message
      return res.render('users/signin', {
        title: 'Sign in',
        error: 'Invalid username or password.'
      });
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      firstName: user.firstName
    };

    res.redirect('/items');
  } catch (err) {
    next(err);
  }
};

// GET /signout
exports.signout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};


//ends