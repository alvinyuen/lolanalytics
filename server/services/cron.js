'use strict';

const cron = require('node-cron');
const Summoner = require('../models/summoner.model');
const chalk = require('chalk');
const envVariables = require('../../env.json');
const axios = require('axios');
const region = 'NA';
const riotKey = envVariables.riotApiKey;

//100 challengers, get 50 => fo


(function() {
    let challengerIds = [];
    axios.get(` https://na.api.pvp.net/api/lol/NA/v2.5/league/challenger?type=RANKED_SOLO_5x5&api_key=${riotKey}`)
            .then(result => result.data)
            .then(result => {
                challengerIds = result.entries.map(challenger=> challenger.playerOrTeamId);
                return challengerIds;
            })
            .then(challengerIds => {
                const job = cron.schedule("*/5 * * * * *", () => {

                    let challengerId = challengerIds.splice(Math.floor(Math.random()*challengerIds.length), 1)[0];
                    console.log('firing:', challengerId);
                   getSummonerProfile(challengerId);
                    getRecentGamePlayers(challengerId)
                        .then(fellowPlayers => {
                            fellowPlayers.forEach(fellowPlayer=> {
                                if(challengerIds.indexOf(fellowPlayer)===-1)
                                    challengerIds.push(fellowPlayer);
                            });
                            console.log('id length:', challengerIds.length);
                    });
                });
                job.start();
            });
})();



const getSummonerProfile = (id) => {
    axios.get(`https://na.api.pvp.net/api/lol/NA/v1.4/summoner/${id}?api_key=${riotKey}`)
        .then(result => result.data)
        .then(apiInfo => {
            return Promise.all(Object.keys(apiInfo).map(key => {
                const summonerWithRegion = Object.assign({}, apiInfo[key], {region: 'NA'});
                return Summoner.updateOrCreateSummoner(summonerWithRegion);
            }));
    })
    .catch(console.err);
};

const getRecentGamePlayers = (id) => {
    return axios.get(`https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/${id}/recent?api_key=${riotKey}`)
    .then(result => result.data)
    .then(recentGames => {
        const playerInGames = [];
        recentGames.games.forEach(game => {
           game.fellowPlayers.forEach(player => playerInGames.push(player.summonerId));
        });
        return playerInGames;
    })
    .catch(console.err);

};



