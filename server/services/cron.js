'use strict';

const cron = require('node-cron');

//models
const Summoner = require('../models/summoner.model');
const Champion = require('../models/champions.model');
const GameStats = require('../models/gameStats.model');

const chalk = require('chalk');
const envVariables = require('../../env.json');
const axios = require('axios');
const riotKey = envVariables.riotApiKey;

// //change this to import match players from different region
const region = 'JP';


// champion data
// (function(){
//     axios.get(`http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`)
//     .then(result=> result.data.data)
//     .then(champions => {
//         for(var champ in champions){
//             Champion.create({
//                 name: champions[champ].name,
//                 championId: champions[champ].key
//             });
//         }
//     });
// })();





// //ranked solo 5x5 challenger ids
// (function() {
//     let challengerIds = [];
//     axios.get(` https://${region}.api.pvp.net/api/lol/${region}/v2.5/league/challenger?type=RANKED_SOLO_5x5&api_key=${riotKey}`)
//             .then(result => result.data)
//             .then(result => {
//                 challengerIds = result.entries.map(challenger=> challenger.playerOrTeamId);
//                 return challengerIds;
//             })
//             .then(challengerIds => {
//                 const job = cron.schedule("*/3 * * * * *", () => {

//                     let challengerId = challengerIds.splice(Math.floor(Math.random()*challengerIds.length), 1)[0];
//                     console.log('firing:', challengerId);
//                    getSummonerProfile(challengerId);
//                     getRecentGamePlayers(challengerId)
//                         .then(fellowPlayers => {
//                             fellowPlayers.forEach(fellowPlayer=> {
//                                 if(challengerIds.indexOf(fellowPlayer)===-1)
//                                     challengerIds.push(fellowPlayer);
//                             });
//                             console.log('id length:', challengerIds.length);
//                     });
//                 });
//                 job.start();
//             });
// })();


//summoner profile
const getSummonerProfile = (id) => {
    axios.get(`https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/${id}?api_key=${riotKey}`)
        .then(result => result.data)
        .then(apiInfo => {
            return Promise.all(Object.keys(apiInfo).map(key => {
                const summonerWithRegion = Object.assign({}, apiInfo[key], {region: `${region}`});
                return Summoner.updateOrCreateSummoner(summonerWithRegion);
            }));
    });
    // .catch(console.err);
};

//get recent game stats



//get fellow players & player match stats
const getRecentGamePlayers = (id) => {
    return axios.get(`https://${region}.api.pvp.net/api/lol/${region}/v1.3/game/by-summoner/${id}/recent?api_key=${riotKey}`)
    .then(result => result.data)
    .then(recentGames => {
        const playerInGames = [];
        return Summoner.findOne({
            where: { id: id}
        }).then(summoner => {
            recentGames.games.forEach(game => {
            game.fellowPlayers.forEach(player => playerInGames.push(player.summonerId));
            const stats = game.stats;
            const role = getPlayerRole(stats);

            //recent game stats (only ranked solo)
            if(game.subType==='RANKED_SOLO_5x5' && role)
                        GameStats.create(Object.assign({gameId: game.gameId, summonerId: id, region: region, gameMode: game.gameMode, gameType: game.gameType, subType:game.subType, championId: game.championId, role:role, summonerUuid: summoner.uuid, createDate: game.createDate}, stats))
                        .then(gameStat => {
                           Champion.findOne({where: {championId: game.championId}})
                           .then(champion => {
                               //add to join table
                                gameStat.addChampions(champion);
                           });
                        });
                        // constantly throws error with dup match and players
                        // .catch(console.error);
            });

        return playerInGames;
        });
    });
    // .catch(console.err);
};

//determine player role in game
const getPlayerRole = (stats) => {
    if(stats.playerPosition===1)
        return 'TOP';
    else if(stats.playerPosition===2)
        return 'MID';
    else if(stats.playerPosition===3)
        return 'JUNGLE';
    else if(stats.playerRole===2)
        return 'SUPPORT';
    else if(stats.playerRole===3)
        return 'CARRY';
    else
        return null;
};













