'use strict';

var Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/sneakpeak', {
    logging: false
});




module.exports =  db;
