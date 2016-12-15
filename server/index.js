'use strict';

// express
const app = require('express')();
const path = require('path');


// db
const db = require('./models/db');
const port = 1338;

//config
require('./configuration/variables')(app);

// middle-ware & server side-effects

app.use(require('./middleware/logging.middleware'));
app.use(require('./middleware/static.middleware'));

app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});


app.get('/*', function(req, res, next) {
    res.sendFile(app.get('indexHTMLPath'));
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

