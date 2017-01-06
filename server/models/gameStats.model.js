'use strict';

const Sequelize = require('sequelize');

const db = require('./_db');

const GameStats = db.define('gameStats', {

    //general
    gameId: {type: Sequelize.BIGINT, unique: 'compositeIndex'},  //unique
    summonerId: { type: Sequelize.BIGINT, unique: 'compositeIndex'},  //unique
    region: { type: Sequelize.STRING, unique: 'compositeIndex'}, //unique
    gameMode: {type: Sequelize.STRING},
    gameType: {type: Sequelize.STRING},
    subType: {type: Sequelize.STRING},  //RANKED SOLO 5x5
    createDate: {type: Sequelize.DATE},   //match date
    championId: {type: Sequelize.INTEGER}, //champion played
    timePlayed: {type: Sequelize.INTEGER},

    //general stats
    championsKilled: {type: Sequelize.INTEGER, defaultValue: 0},
    numDeaths: {type: Sequelize.INTEGER, defaultValue: 0},
    assists : {type: Sequelize.INTEGER, defaultValue: 0},
    win : {type: Sequelize.BOOLEAN,},

    /* push - per min basis */
    turretsKilled: {type: Sequelize.INTEGER, defaultValue: 0},
    totalDamageDealtToBuildings: {type: Sequelize.INTEGER, defaultValue: 0},
    totalDamageDealtToBuildingsPerMin:  {type: Sequelize.FLOAT},

    //farm
    minionsKilled: {type: Sequelize.INTEGER, defaultValue: 0},
    goldEarned: {type: Sequelize.INTEGER, defaultValue: 0},

    //jungle
    neutralMinionsKilled : {type: Sequelize.INTEGER, defaultValue: 0},

    /* fighter - per min basis */
    totalDamageDealt : {type: Sequelize.INTEGER, defaultValue: 0},
    totalDamageDealtPerMin: {type: Sequelize.FLOAT},
    totalDamageTaken : {type: Sequelize.INTEGER,defaultValue: 0,},
    totalDamageTakenPerMin: {type: Sequelize.FLOAT},
    totalDamageDealtToChampions: {type: Sequelize.INTEGER,defaultValue: 0,},
    totalDamageDealtToChampionsPerMin: {type: Sequelize.FLOAT},
    killingSprees : {type: Sequelize.INTEGER, defaultValue: 0},
    largestKillingSpree : {type: Sequelize.INTEGER, defaultValue: 0},

    /* versatility - per 5 minute basis */
    wardKilled : {type: Sequelize.INTEGER,defaultValue: 0,},
    wardKilledPerFiveMin: {type: Sequelize.FLOAT},
    wardPlaced: {type: Sequelize.INTEGER,defaultValue: 0},
    wardPlacedPerFiveMin: {type: Sequelize.FLOAT},
    visionWardsBought: {type: Sequelize.INTEGER,defaultValue: 0,},
    visionWardsBoughtPerFiveMin: {type: Sequelize.FLOAT},

    //position
    //(Legal values: TOP(1), MIDDLE(2), JUNGLE(3), BOT(4))
    //(Legal values: DUO(1), SUPPORT(2), CARRY(3), SOLO(4))
    playerRole: {type: Sequelize.INTEGER},
    playerPosition: {type: Sequelize.INTEGER},
    role: {type: Sequelize.STRING}

}, {
    hooks: {
		beforeCreate: function (gameStats) {
			gameStats.totalDamageDealtToBuildingsPerMin = gameStats.totalDamageDealtToBuildings/gameStats.timePlayed*60;
            gameStats.totalDamageDealtPerMin = gameStats.totalDamageDealt/gameStats.timePlayed*60;
            gameStats.totalDamageTakenPerMin = gameStats.totalDamageTaken/gameStats.timePlayed*60;
            gameStats.totalDamageDealtToChampionsPerMin = gameStats.totalDamageDealtToChampions/gameStats.timePlayed*60;
            gameStats.wardKilledPerFiveMin = gameStats.wardKilled/gameStats.timePlayed*300;
            gameStats.wardPlacedPerFiveMin = gameStats.wardPlaced/gameStats.timePlayed*300;
            gameStats.visionWardsBoughtPerFiveMin = gameStats.visionWardsBought/gameStats.timePlayed*300;
		}
	}
});

module.exports = GameStats;

// level: 18,
// goldEarned: 16484,
// numDeaths: 8,
// turretsKilled: 1,
// minionsKilled: 98,
// championsKilled: 8,
// goldSpent: 14850,
// totalDamageDealt: 212499,
// totalDamageTaken: 38519,
// doubleKills: 2,
// killingSprees: 3,
// largestKillingSpree: 4,
// team: 100,
// win: true,
// neutralMinionsKilled: 105,
// largestMultiKill: 2,
// physicalDamageDealtPlayer: 52721,
// magicDamageDealtPlayer: 147100,
// physicalDamageTaken: 29720,
// magicDamageTaken: 7613,
// timePlayed: 2226,
// totalHeal: 13469,
// totalUnitsHealed: 12,
// assists: 16,
// item0: 3152,
// item1: 3139,
// item2: 3107,
// item3: 3191,
// item4: 3158,
// item5: 1402,
// item6: 3363,
// magicDamageDealtToChampions: 22183,
// physicalDamageDealtToChampions: 6275,
// totalDamageDealtToChampions: 32634,
// trueDamageDealtPlayer: 12678,
// trueDamageDealtToChampions: 4175,
// trueDamageTaken: 1185,
// wardKilled: 3,
// wardPlaced: 11,
// neutralMinionsKilledEnemyJungle: 47,
// neutralMinionsKilledYourJungle: 58,
// totalTimeCrowdControlDealt: 425,
// playerPosition: 3,
// bountyLevel: 2,
// totalDamageDealtToBuildings: 8148,
// visionWardsBought: 1

