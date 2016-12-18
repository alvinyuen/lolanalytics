'use strict';

const router = require('express').Router();
const chalk = require('chalk');
const session = require('express-session');

//redis for sessions
const RedisStore = require('connect-redis')(session);

//session middleware
router.use(session({
    secret: 'secret',
    store: new RedisStore({
        host:'localhost',
        port: '6379'
    }),
    resave: false,
    saveUninitialized: false
}));

module.exports = router;
