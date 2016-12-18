'use strict';

// express
const app = require('express')();
const path = require('path');

// db
const db = require('./models/db').db;
const port = 1338;

//configuration variables
require('./configuration/variables')(app);

// middle-ware & server side-effects

//body parsing middleware
app.use(require('./middleware/body-parsing.middleware'));

//logging middleware
app.use(require('./middleware/logging.middleware'));

//static middleware
app.use(require('./middleware/static.middleware'));

//session middleware
app.use(require('./middleware/session.middleware'));

//passport middleware
app.use(require('./middleware/passport.middleware'));

//webscrapper
app.use(require('./services/webscrapper-service'));

//testing purposes
// app.use('/*', (req, res, next) => {
//     console.log('TESTING req.user =>', req.user);
//     console.log('TESTING user is AUTHED', req.isAuthenticated());
//     next();
// })

//login, signup, logout router
app.use('/api/signup', require('./api/signup.router'));
app.use('/api/login', require('./api/login.router'));
app.get('/api/logout', (req, res, next) => {
    req.session.destroy();
    res.send();
});



app.get('/*', function(req, res, next) {
    console.log('requiring path:', req.path)
    res.sendFile(app.get('indexHTMLPath'));
});

//error handling
app.get((err, req, res, next) => {
    res.status(err.status).send(err.message);
});

//port
const server = app.listen(port, (err)=> {
   if(err) throw err;
   db.sync()
   .then(()=> {
       console.log(`sneakpeak server is connected to port ${port}`)
   });
});

module.exports = server;

