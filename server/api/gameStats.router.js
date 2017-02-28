'use strict';

const router = require('express').Router();
const Sequelize = require('sequelize');

const { Summoner, GameStats, Champion, } = require('../models/db');
const GameChampions = require('../models/db').GameChampions;
const chalk = require('chalk');
const envVariables = require('../../env.json');
const axios = require('axios');

const riotKey = envVariables.riotApiKey;


/* find all match game stats */
router.get('/summonerGameStats/all', (req, res, next) => {
   GameStats.findAll().then(gameStats => {
       res.send(gameStats);
   });
});

/* match game count */
router.get('/summonerGameStats/count', (req, res, next) => {
   GameStats.count().then(count => {
    console.log(chalk.yellow("There are " + count + " matches!"));
    res.send({count: count});
    });
});


/* find all game stats with summoner info and champion info */
router.get('/summonerGameStats/allWithSummoners', (req, res, next) => {
   GameStats.findAll({
       include:[{ model: Summoner}, {model: Champion}]
   }).then(gameStats => {
       res.send(gameStats);
   });
});



//find average stats given summoner grouped by roles
/* change naming to not include average for front end display purposes */
router.get('/summonerGameStats/summoner/:summonerId', (req, res, next) => {
    const { summonerId } = req.params;
   GameStats.findAll({
        attributes: [
                    'summonerId',
                    'role',
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.championsKilled')), 'ChampionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.numDeaths')), 'NumDeaths'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.assists')), 'Assists'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.turretsKilled')), 'TurretsKilled'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToBuildingsPerMin')), 'TotalDamageDealtToBuildings'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.minionsKilled')), 'MinionsKilled'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.goldEarned')), 'GoldEarned'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.neutralMinionsKilled')), 'NeutralMinionsKilled'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtPerMin')), 'TotalDamageDealt'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageTakenPerMin')), 'TotalDamageTaken'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToChampionsPerMin')), 'TotalDamageDealtToChampions'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.killingSprees')), 'KillingSprees'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.largestKillingSpree')), 'LargestKillingSpree'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.wardKilledPerFiveMin')), 'WardKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.wardPlacedPerFiveMin')), 'WardPlaced'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.visionWardsBoughtPerFiveMin')), 'VisionWardsBought']
                    ],
        // order: [[Sequelize.fn('AVG', Sequelize.col('championsKilled')), 'DESC']],
        group:  ['summonerId', 'role'],
        where: {
            summonerId: summonerId
        }

    }).then(aggregate => {
        res.send(aggregate);
    });
});

router.get('/summonerGameStats/summoner/:summonerId/mainStats', (req, res, next) => {
    const { summonerId } = req.params;
   GameStats.findAll({
        attributes: [
                    'summonerId',
                    'role',
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToBuildingsPerMin')), 'TotalDamageDealtToBuildings'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.minionsKilled')), 'MinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.goldEarned')), 'GoldEarned'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.neutralMinionsKilled')), 'NeutralMinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtPerMin')), 'TotalDamageDealt'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageTakenPerMin')), 'TotalDamageTaken'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToChampionsPerMin')), 'TotalDamageDealtToChampions'],
                    ],
        // order: [[Sequelize.fn('AVG', Sequelize.col('championsKilled')), 'DESC']],
        group:  ['summonerId', 'role'],
        where: {
            summonerId: summonerId
        }

    }).then(aggregate => {
        res.send(aggregate);
    });
});



/* find average stats grouped by region */
router.get('/summonerGameStats/averageByRegion', (req, res, next) => {
   GameStats.findAll({
        attributes: [ 'region',
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
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.visionWardsBoughtPerFiveMin')), 'averageVisionWardsBought']
                    ],
        // order: [[Sequelize.fn('AVG', Sequelize.col('championsKilled')), 'DESC']],
        group:  'region '
    }).then(aggregate => {
        res.send(aggregate);
    });
});

/* find average stats for given region */
router.get('/summonerGameStats/region/:region', (req, res, next) => {
    const { region } = req.params;
   GameStats.findAll({
        attributes: [ 'region',
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
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.visionWardsBoughtPerFiveMin')), 'averageVisionWardsBought']
                    ],
        group:  'region ',
        where: { region: region}
    }).then(aggregate => {
        res.send(aggregate);
    });
});

/* find average stats grouped by role */
router.get('/summonerGameStats/averageByRole', (req, res, next) => {
   GameStats.findAll({
        attributes: [
                    'role',
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.championsKilled')), 'averageChampionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.numDeaths')), 'averageNumDeaths'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.assists')), 'averageAssists'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.turretsKilled')), 'averageTurretsKilled'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToBuildingsPerMin')), 'averageTotalDamageDealtToBuildings'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.minionsKilled')), 'averageMinionsKilled'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.goldEarned')), 'averageGoldEarned'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.neutralMinionsKilled')), 'averageNeutralMinionsKilled'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtPerMin')), 'averageTotalDamageDealt'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageTakenPerMin')), 'averageTotalDamageTaken'],
                    // [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToChampionsPerMin')), 'averageTotalDamageDealtToChampions'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.killingSprees')), 'averageKillingSprees'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.largestKillingSpree')), 'averageLargestKillingSpree'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.wardKilledPerFiveMin')), 'averageWardKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.wardPlacedPerFiveMin')), 'averageWardPlaced'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.visionWardsBoughtPerFiveMin')), 'averageVisionWardsBought']
                    ],
        group:  ['role']
    }).then(aggregate => {
        res.send(aggregate);
    });
});


/* find average stats grouped - damage - grouped by role */
router.get('/summonerGameStats/averageByRole/mainStats', (req, res, next) => {
   GameStats.findAll({
        attributes: [
                    'role',
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToBuildingsPerMin')), 'averageTotalDamageDealtToBuildings'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.minionsKilled')), 'averageMinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.goldEarned')), 'averageGoldEarned'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.neutralMinionsKilled')), 'averageNeutralMinionsKilled'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtPerMin')), 'averageTotalDamageDealt'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageTakenPerMin')), 'averageTotalDamageTaken'],
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.totalDamageDealtToChampionsPerMin')), 'averageTotalDamageDealtToChampions'],
                    ],
        group:  ['role']
    }).then(aggregate => {
        res.send(aggregate);
    });
});




//find average stats for given role
router.get('/summonerGameStats/role/:role', (req, res, next) => {
    const { role } = req.params;
   GameStats.findAll({
        attributes: [
                    'role',
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
                    [Sequelize.fn('AVG', Sequelize.col('gameStats.visionWardsBoughtPerFiveMin')), 'averageVisionWardsBought']
                    ],
        // order: [[Sequelize.fn('AVG', Sequelize.col('championsKilled')), 'DESC']],
        group:  ['role'],
        where: {
            role: role
        }

    }).then(aggregate => {
        res.send(aggregate);
    });
});




module.exports = router;

