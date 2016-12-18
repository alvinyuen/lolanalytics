'use strict';

const router = require('express').Router();
const User = require('../models/user.model');
const chalk = require('chalk');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


//log in
router.post('/', (req, res, next) => {
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
        }
    })
    .then((user) => {
        if(!user){
            done(null, false, {message: 'email or password is incorrect'});
        }
        else {
            return Promise.all([
                user.checkPassword(password),
                user
            ])
        }
    })
    .then(result => {
        const [passwordMatched, user] = result;
        if(!passwordMatched) {
            done(null, false, {message: 'email or password is incorrect'});
        }
        else {
            done(null, user);
        }
    })
    .catch(done);
}));


//check logged in status
router.get('/check', (req, res, next) => {
    req.isAuthenticated() ? res.json(req.user) : res.json();
});

module.exports = router;

