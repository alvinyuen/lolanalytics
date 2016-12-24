
const router = require('express').Router();
const passport = require('passport');
const chalk = require('chalk');
const User = require('../models/user.model');


//passport middleware
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then( (user) => {
    done(null, user);
  })
  .catch( (err) => {
    done(err);
  });
});



module.exports = router;