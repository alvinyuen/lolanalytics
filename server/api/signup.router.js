'use strict';

const router = require('express').Router();
const chalk = require('chalk');
const User = require('../models/user.model');


//sign up
router.post('/', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then( user => {
        //conflict
        if(user) res.send({message: 'email already exists'});
        else {
            return User.create(req.body);
        }
    })
    .then((user) => {
        console.log('user created:' + chalk.blue(JSON.stringify(user)));
        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.send(user);
        });

    });
});


module.exports = router;
