'use strict';

const Sequelize = require('sequelize');

const db = require('./_db');

const Champion = db.define('champion', {
    name: {type: Sequelize.STRING},
    championId: {type: Sequelize.INTEGER, primaryKey: true},
},
{
    hooks: {
        beforeCreate: function(){
            Champion.truncate();
        }
    }

}
);

module.exports = Champion;

