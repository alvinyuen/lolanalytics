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
router.get('/champions/all/names', (req, res, next) => {
   Champion.findAll(
       {attributes: ['name']}
   ).then(champions => {
       res.send(champions);
   });
});

module.exports = router;