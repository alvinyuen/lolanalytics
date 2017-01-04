'use strict';

const Sequelize = require('sequelize');

const db = require('./_db');

const GameStats = db.define('gameStats', {

    //general
    gameId: {type: Sequelize.BIGINT, unique: 'compositeIndex'},  //unique
    summonerId: { type: Sequelize.BIGINT, unique: 'compositeIndex'},  //unique
    region: { type: Sequelize.STRING, unique: 'compositeIndex'},
    gameMode: {type: Sequelize.STRING},
    gameType: {type: Sequelize.STRING},
    subType: {type: Sequelize.STRING},
    createDate: {type: Sequelize.DATE},   //match date
    championId: {type: Sequelize.INTEGER},

    //general stats
    championsKilled: {type: Sequelize.INTEGER, defaultValue: 0},
    numDeaths: {type: Sequelize.INTEGER, defaultValue: 0},
    assists : {type: Sequelize.INTEGER, defaultValue: 0},
    win : {type: Sequelize.BOOLEAN,},

    //push
    turretsKilled: {type: Sequelize.INTEGER, defaultValue: 0},
    totalDamageDealtToBuildings: {type: Sequelize.INTEGER, defaultValue: 0},

    //farm
    minionsKilled: {type: Sequelize.INTEGER, defaultValue: 0},
    goldEarned: {type: Sequelize.INTEGER, defaultValue: 0},

    //jungle
    neutralMinionsKilled : {type: Sequelize.INTEGER, defaultValue: 0},

    //fighter
    totalDamageDealt : {type: Sequelize.INTEGER, defaultValue: 0},
    totalDamageTaken : {type: Sequelize.INTEGER, defaultValue: 0},
    killingSprees : {type: Sequelize.INTEGER, defaultValue: 0},
    largestKillingSpree : {type: Sequelize.INTEGER, defaultValue: 0},

    //versatile
    wardKilled : {type: Sequelize.INTEGER, defaultValue: 0},
    wardPlaced: {type: Sequelize.INTEGER, defaultValue: 0},
    visionWardsBought: {type: Sequelize.INTEGER, defaultValue: 0},

    //position
    //(Legal values: TOP(1), MIDDLE(2), JUNGLE(3), BOT(4))
    //(Legal values: DUO(1), SUPPORT(2), CARRY(3), SOLO(4))
    playerRole: {type: Sequelize.INTEGER},
    playerPosition: {type: Sequelize.INTEGER}

});

module.exports = GameStats;

