'use strict';

var Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/riotanalyticsdemo', {
    logging: false
});




module.exports =  db;
