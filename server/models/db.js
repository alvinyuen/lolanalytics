'use strict';
/*eslint no-undef: "error"*/

const db = require('./_db');
const User = require('./user.model');
const Summoner = require('./summoner.model');
const GameStats = require('./gameStats.model');
const Champion = require('./champions.model');




//-----define associations here----//
Summoner.hasMany(GameStats);
GameStats.belongsTo(Summoner);


module.exports = {
    db: db,
    User: User,
    Summoner: Summoner,
    Champion: Champion
};