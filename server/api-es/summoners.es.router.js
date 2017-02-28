'use strict';

const router = require('express').Router();
const Sequelize = require('sequelize');

const { Summoner, GameStats, Champion } = require('../models/db');
const chalk = require('chalk');
const envVariables = require('../../env.json');
const axios = require('axios');

const { searchAll, searchAllWithinLimit } = require('../services/elasticsearch');



router.get('/es/summoners/allInfo/all', (req, res, next) => {
    console.time('elasticsearch total time took:');
    searchAll('riot')
    .then(results=> {
        console.timeEnd('elasticsearch total time took:');
       res.send(results);
    });

});





module.exports = router;