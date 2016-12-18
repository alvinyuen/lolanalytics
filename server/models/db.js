'use strict';
/*eslint no-undef: "error"*/

const db = require('./_db');
const User = require('./user.model');


//-----define associations here----//



module.exports = {
    db: db,
    User: User
}