'use strict';

const router = require('express').Router();
const Sequelize = require('sequelize');
const Summoner = require('../models/summoner.model');
const GameStats = require('../models/gameStats.model');
const chalk = require('chalk');
const envVariables = require('../../env.json');
const axios = require('axios');

const riotKey = envVariables.riotApiKey;


//find game stats by summoner
router.get('/summonerGameStats/:summonerId/:region', (req, res, next) => {
    const { summonerId, region } = req.params;
   Summoner.findOne({
    where: { id: summonerId },
    include: [{ model: GameStats }]

   })
   .then(summonerStats => {
      res.send(summonerStats);
   });
});

//find average game stats by summoner
router.get('/summonerGameStats/summonerAverage/:summonerId/:region', (req, res, next) => {
    const {summonerId, region} = req.params;
    Summoner.findAll({
        attributes:Object.keys(Summoner.attributes).concat([
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.championsKilled')), 'averageChampionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.numDeaths')), 'averageNumDeaths'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.assists')), 'averageAssists'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.turretsKilled')), 'averageTurretsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToBuildings')), 'averageTotalDamageDealtToBuildings'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.minionsKilled')), 'averageMinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.goldEarned')), 'averageGoldEarned'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.neutralMinionsKilled')), 'averageMinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealt')), 'averageTotalDamageDealt'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.killingSprees')), 'averageKillingSprees'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.largestKillingSpree')), 'averageLargestKillingSpree'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.wardKilled')), 'averageWardKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.wardPlaced')), 'averageWardPlaced'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.visionWardsBought')), 'averageVisionWardsBought']
            ]),
        include: [ {model: GameStats, as: 'gameStats', attributes:[] }],
        group: ['uuid'],
        where: {id: summonerId, region: region}
    }).then(summonerWithAvgStats => {
        res.send(summonerWithAvgStats);
    });

});

//find all game stats and all summoners
router.get('/summonerGameStats/all', (req, res, next) => {
   const { summonerId } = req.params;
   GameStats.findAll({
       include:[{ model: Summoner}]
   }).then(gameStats => {
       res.send(gameStats);
   });
});

//find average stats grouped by region
router.get('/summonerGameStats/average', (req, res, next) => {
   GameStats.findAll({
        attributes: [ 'region',
                    [Sequelize.fn('AVG', Sequelize.col('championsKilled')), 'averageChampionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('numDeaths')), 'averageNumDeaths'],
                    [Sequelize.fn('AVG', Sequelize.col('assists')), 'averageAssists'],
                    [Sequelize.fn('AVG', Sequelize.col('turretsKilled')), 'averageTurretsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('totalDamageDealtToBuildings')), 'averageTotalDamageDealtToBuildings'],
                    [Sequelize.fn('AVG', Sequelize.col('minionsKilled')), 'averageMinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('goldEarned')), 'averageGoldEarned'],
                    [Sequelize.fn('AVG', Sequelize.col('neutralMinionsKilled')), 'averageMinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('totalDamageDealt')), 'averageTotalDamageDealt'],
                    [Sequelize.fn('AVG', Sequelize.col('killingSprees')), 'averageKillingSprees'],
                    [Sequelize.fn('AVG', Sequelize.col('largestKillingSpree')), 'averageLargestKillingSpree'],
                    [Sequelize.fn('AVG', Sequelize.col('wardKilled')), 'averageWardKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('wardPlaced')), 'averageWardPlaced'],
                    [Sequelize.fn('AVG', Sequelize.col('visionWardsBought')), 'averageVisionWardsBought']
                    ],
        // order: [[Sequelize.fn('AVG', Sequelize.col('championsKilled')), 'DESC']],
        group:  'region '
    }).then(aggregate => {
        res.send(aggregate);
    });


});


//avg game stats grouped by summoner
router.get('/summonerGameStats/bySummoners', (req, res, next) => {
   Summoner.findAll({
        attributes:
            Object.keys(Summoner.attributes).concat([
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.championsKilled')), 'averageChampionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.numDeaths')), 'averageNumDeaths'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.assists')), 'averageAssists'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.turretsKilled')), 'averageTurretsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToBuildings')), 'averageTotalDamageDealtToBuildings'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.minionsKilled')), 'averageMinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.goldEarned')), 'averageGoldEarned'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.neutralMinionsKilled')), 'averageMinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealt')), 'averageTotalDamageDealt'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.killingSprees')), 'averageKillingSprees'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.largestKillingSpree')), 'averageLargestKillingSpree'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.wardKilled')), 'averageWardKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.wardPlaced')), 'averageWardPlaced'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.visionWardsBought')), 'averageVisionWardsBought']
            ]),
        include: [ {model: GameStats, as: 'gameStats', attributes: []}],
        group: ['uuid']
    }).then(aggregate => {
        res.send(aggregate);
    });


});

module.exports = router;

