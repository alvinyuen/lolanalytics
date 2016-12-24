'use strict';

const router = require('express').Router();
const Summoner = require('../models/summoner.model');
const chalk = require('chalk');
const envVariables = require('../../env.json');
const axios = require('axios');


router.get('/search/summoner/:region/:name', (req, res, next) => {
    const {region, name} = req.params;
    const riotKey = envVariables.riotApiKey;
    console.log(region, name, riotKey);
   Summoner.findOne({
       where: {
           region: region,
           name: name
       }
   })
   .then(summoner => {
       if(!summoner) {
            axios.get(`https://na.api.pvp.net/api/lol/${region}/v1.4/summoner/by-name/${name}?api_key=${riotKey}`)
            .then(result => result.data[name])
            .then(apiInfo => {
                const newInfo = Object.assign({}, apiInfo, {region: 'NA'});
                return Summoner.updateOrCreateSummoner(newInfo);
            })
            .then(summoner=> {
                 console.log('DAT',chalk.blue(JSON.stringify(summoner)));
                res.json(summoner);
            })
            .catch(next);
       }
   });

});









module.exports = router;


