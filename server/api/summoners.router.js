'use strict';

const router = require('express').Router();
const Sequelize = require('sequelize');

const Summoner = require('../models/summoner.model');
const GameStats = require('../models/gameStats.model');
const chalk = require('chalk');
const envVariables = require('../../env.json');
const axios = require('axios');


//find all summoners
router.get('/summoners/all', (req, res, next) => {
    const { region } = req.params;
    const riotKey = envVariables.riotApiKey;

   Summoner.findAll()
   .then(summoners => {
      res.send(summoners);
   });
});

// summoner count
router.get('/summoners/all/count', (req, res, next) => {
    const { region } = req.params;
    const riotKey = envVariables.riotApiKey;

   Summoner.count()
   .then(count => {
      res.send({count: count});
   });
});

//find all summoners by region
router.get('/summoners/all/:region', (req, res, next) => {
    const { region } = req.params;
    const riotKey = envVariables.riotApiKey;

   Summoner.findAll({
       where:{ region: region}
   })
   .then(summoners => {
      res.send(summoners);
   });
});

//find one summoner's game stats
router.get('/summoner/gameStats/:summonerId/:region', (req, res, next) => {
    const { summonerId, region } = req.params;
   Summoner.findOne({
    where: { id: summonerId },
    include: [{ model: GameStats }]
   })
   .then(summonerStats => {
      res.send(summonerStats);
   });
});

//find one summoner's average game stats
router.get('/summoner/averageGameStats/:summonerId/:region', (req, res, next) => {
    const {summonerId, region} = req.params;
    Summoner.findAll({
        attributes:Object.keys(Summoner.attributes).concat([
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.championsKilled')), 'averageChampionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.numDeaths')), 'averageNumDeaths'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.assists')), 'averageAssists'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.turretsKilled')), 'averageTurretsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToBuildingsPerMin')), 'averageTotalDamageDealtToBuildings'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.minionsKilled')), 'averageMinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.goldEarned')), 'averageGoldEarned'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.neutralMinionsKilled')), 'averageNeutralMinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtPerMin')), 'averageTotalDamageDealt'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageTakenPerMin')), 'averageTotalDamageTaken'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToChampionsPerMin')), 'averageTotalDamageDealtToChampions'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.killingSprees')), 'averageKillingSprees'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.largestKillingSpree')), 'averageLargestKillingSpree'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.wardKilledPerFiveMin')), 'averageWardKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.wardPlacedPerFiveMin')), 'averageWardPlaced'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.visionWardsBoughtPerFiveMin')), 'averageVisionWardsBought'],
            ]),
        include: [ {model: GameStats, as: 'gameStats', attributes:[] }],
        group: ['uuid'],
        where: {id: summonerId, region: region}
    }).then(summonerWithAvgStats => {
        res.send(summonerWithAvgStats);
    });
});

//avg game stats grouped by summoners
router.get('/summoners/averageGameStats', (req, res, next) => {
   Summoner.findAll({
        attributes:
            Object.keys(Summoner.attributes).concat([
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.championsKilled')), 'averageChampionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.numDeaths')), 'averageNumDeaths'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.assists')), 'averageAssists'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.turretsKilled')), 'averageTurretsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToBuildingsPerMin')), 'averageTotalDamageDealtToBuildings'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.minionsKilled')), 'averageMinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.goldEarned')), 'averageGoldEarned'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.neutralMinionsKilled')), 'averageNeutralMinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtPerMin')), 'averageTotalDamageDealt'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageTakenPerMin')), 'averageTotalDamageTaken'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToChampionsPerMin')), 'averageTotalDamageDealtToChampions'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.killingSprees')), 'averageKillingSprees'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.largestKillingSpree')), 'averageLargestKillingSpree'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.wardKilledPerFiveMin')), 'averageWardKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.wardPlacedPerFiveMin')), 'averageWardPlaced'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.visionWardsBoughtPerFiveMin')), 'averageVisionWardsBought'],
            ]),
        include: [ {model: GameStats, as: 'gameStats', attributes: []}],
        group: ['uuid']
    }).then(aggregate => {
        res.send(aggregate);
    });
});

module.exports = router;
