'use strict';

const router = require('express').Router();
const Summoner = require('../models/summoner.model');
const chalk = require('chalk');
const envVariables = require('../../env.json');
const axios = require('axios');


//update all summoners
router.get('/summoners/:region', (req, res, next) => {
    const { region } = req.params;
    const riotKey = envVariables.riotApiKey;

   Summoner.findAll({
       attributes: [
           'name'
       ]
   })
   .then(summoners => {
       const names = summoners.map(sum => sum.name).join(',');
       if(names){
        axios.get(`https://na.api.pvp.net/api/lol/${region}/v1.4/summoner/by-name/${names}?api_key=${riotKey}`)
            .then(result => result.data)
            .then(apiInfo => {
                // console.log(chalk.red(JSON.stringify(apiInfo)));
                return Promise.all(Object.keys(apiInfo).map(key => {
                    const summonerWithRegion = Object.assign({}, apiInfo[key], {region: 'NA'});
                    return Summoner.updateOrCreateSummoner(summonerWithRegion);
                }));
            })
            .then(summoners => {
                console.log(chalk.red(JSON.stringify(summoners)));
                res.send(summoners);
            })
            .catch(next);
       }
   });

});

module.exports = router;
