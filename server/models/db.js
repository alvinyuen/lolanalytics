'use strict';
/*eslint no-undef: "error"*/

const db = require('./_db');
const User = require('./user.model');
const Summoner = require('./summoner.model');
const GameStats = require('./gameStats.model');
const Champion = require('./champions.model');

const Sequelize = require('sequelize');

// //join table
// const GameChampions = db.define('game_champions', {
//     championId: {type: Sequelize.INTEGER, unique: 'composite_champion_game'},
//     gameStatsId: {type: Sequelize.INTEGER, unique: 'composite_champion_game'}
// });


//-----define associations here----//
Summoner.hasMany(GameStats);
GameStats.belongsTo(Summoner);
Champion.belongsToMany(GameStats, { through: 'GameChampions' , foreignKey: 'championId'});
GameStats.belongsToMany(Champion, { through: 'GameChampions', foreignKey: 'gameStatsId' });


module.exports = {
    db: db,
    Summoner: Summoner,
    Champion: Champion,
};