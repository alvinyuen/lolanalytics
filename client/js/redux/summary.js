//@flow

import axios from 'axios';

/* ------ actions ------- */

const SET_SUMMONER_COUNT = 'SET_SUMMONER_COUNT';
const SET_GAME_COUNT = 'SET_GAME_COUNT';
const SET_CHAMPION_NAMES = 'SET_CHAMPION_NAMES';


/* ------ action creators ------ */
const setSummonerCount = summonerCount => ({ type: SET_SUMMONER_COUNT, summonerCount});

const setGameCount = gameCount => ({ type: SET_GAME_COUNT, gameCount});

const setChampionNames = championNames => ({ type: SET_CHAMPION_NAMES, championNames});



/* ------ reducer ------ */
export const summonerCount = function setSummonerCountReducer ( summonerCount = 0, action){
    switch(action.type){
        case SET_SUMMONER_COUNT:
            return action.summonerCount;
        default:
            return summonerCount;
    }
};

export const gameCount =  function setGameCountReducer( gameCount = 0, action ){
    switch(action.type){
        case SET_GAME_COUNT:
            return action.gameCount;
        default:
            return gameCount;
    }
};

export const championNames = function setChampionNamesReducer(championNames = [], action){
    switch(action.type){
        case SET_CHAMPION_NAMES:
            return action.championNames;
        default:
            return championNames;
    }
}



/* ------ dispatcher ------- */
export const updateSummonerCount = () => dispatch => {
    axios.get(`api/riot/summoners/all/count`)
    .then((res)=> {
        dispatch(setSummonerCount(res.data.count))})
    .catch( err => console.error(`update summoner count unsuccessful: ${err}`));
};

export const updateGameCount = () => dispatch => {
    axios.get(`api/riot/summonerGameStats/count`)
    .then((res)=> {
        dispatch(setGameCount(res.data.count))})
    .catch( err => console.error(`update game count unsuccessful: ${err}`));
}

export const updateChampionNames = () => dispatch => {
    axios.get(`api/riot/champions/all/names`)
    .then((res)=> {
        console.log('CHAMPS', res.data)
        dispatch(setChampionNames(res.data))})
    .catch( err => console.error(`update champion names unsuccessful: ${err}`));
}


