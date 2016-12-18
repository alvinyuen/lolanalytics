'use strict';

const router = require('express').Router();
const User = require('../models/user.model');
const chalk = require('chalk');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.post('/', (req, res, next) => {
    console.log('LOGGING IN:', req.body);
    passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.send(info); }
    else{
       req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(user);
        });
    }
  })(req, res, next)
});



passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    User.findOne({
        where: {
            email: email,
            password: password
        }
    })
    .then((user) => {
        console.log('user found in local stragegy', user);
        if(!user){
            done(null, false, {message: 'email or password is incorrect'});
        }
        else {
            done(null, user);
        }
    })
    .catch(done);
}));

router.get('/check', (req, res, next) => {
    console.log(chalk.red('retrieving user login status'));
    console.log(`is user authencated : ${req.user} is ${req.isAuthenticated()}`);
    req.isAuthenticated() ? res.json(req.user) : res.json();
});

module.exports = router;

