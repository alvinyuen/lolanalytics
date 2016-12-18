'use strict';

const Sequelize = require('sequelize');



const db = require('./_db');

const User = db.define('user', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: Sequelize.STRING,
    googleId: Sequelize.STRING
});



module.exports = User;