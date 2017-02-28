//@flow

import axios from 'axios';


const initialState = {
    singleSummoner: {},
    averageRegionStats: [],
    averagePlayerStats: [],
    averageRegionMainStats: [],
    averagePlayerMainStats: []
}

/* ------ actions ------- */

const SET_SINGLE_SUMMONER = 'SET_SINGLE_SUMMONER';
const SET_AVERAGE_REGION_STATS = 'SET_AVERAGE_REGION_STATS';
const SET_AVERAGE_PLAYER_STATS = 'SET_AVERAGE_PLAYER_STATS';
const SET_AVERAGE_PLAYER_MAIN_STATS = 'SET_AVERAGE_PLAYER_MAIN_STATS';
const SET_AVERAGE_REGION_MAIN_STATS = 'SET_AVERAGE_REGION_MAIN_STATS';


/* ------ action creators ------ */
const setSingleSummoner = singleSummoner => ({ type: SET_SINGLE_SUMMONER, singleSummoner});
const setAverageRegionStats = averageRegionStats => ({ type: SET_AVERAGE_REGION_STATS, averageRegionStats});
const setAveragePlayerStats = averagePlayerStats => ({ type: SET_AVERAGE_PLAYER_STATS, averagePlayerStats});
const setAveragePlayerMainStats = averagePlayerMainStats => ({ type: SET_AVERAGE_PLAYER_MAIN_STATS, averagePlayerMainStats});
const setAverageRegionMainStats = averageRegionMainStats => ({ type: SET_AVERAGE_REGION_MAIN_STATS, averageRegionMainStats});


/* ------ reducer ------ */
export default function singleSummonerReducer (prevState = initialState, action){
    let nextState = Object.assign({}, prevState);
    switch(action.type){
        case SET_SINGLE_SUMMONER:
            nextState.singleSummoner = action.singleSummoner;
            return nextState;
        case SET_AVERAGE_REGION_STATS:
            nextState.averageRegionStats = action.averageRegionStats;
            return nextState;
        case SET_AVERAGE_PLAYER_STATS:
            nextState.averagePlayerStats = action.averagePlayerStats;
            return nextState;
        case SET_AVERAGE_REGION_MAIN_STATS:
            nextState.averageRegionMainStats = action.averageRegionMainStats;
            return nextState;
        case SET_AVERAGE_PLAYER_MAIN_STATS:
            nextState.averagePlayerMainStats = action.averagePlayerMainStats;
            return nextState;
        default:
            return prevState;
    }
};

/* ------ dispatcher ------- */
export const searchForSummoner = (summonerName, region) => dispatch => {
    console.log('search summoner dispatcher');
    axios.get(`/api/riot/search/summoner/${region}/${summonerName}`)
    .then((res)=> console.log('res from dis:', res))
    .catch( err => console.error(`single summoner search unsuccessful: ${err}`));
};


export const findRegionAverageByRole = () => dispatch => {
    axios.get(`/api/riot/summonerGameStats/averageByRole`)
    .then((res)=> dispatch(setAverageRegionStats(res.data)))
    .catch( err => console.error(`average region stats search unsuccessful: ${err}`));
}


export const findPlayerAverageByRole = (summonerId) => dispatch => {
    axios.get(`/api/riot/summonerGameStats/summoner/${summonerId}`)
    .then((res)=> dispatch(setAveragePlayerStats(res.data)))
    .catch( err => console.error(`average region stats search unsuccessful: ${err}`));
}


/* main stats */
export const findRegionAverageByRoleMainStats = () => dispatch => {
    console.log('CALL REGION MAIN STATSSS');
    axios.get(`/api/riot/summonerGameStats/averageByRole/mainStats`)
    .then((res)=> dispatch(setAverageRegionMainStats(res.data)))
    .catch( err => console.error(`average region main stats search unsuccessful: ${err}`));
}

export const findPlayerAverageByRoleMainStats = (summonerId) => dispatch => {
    console.log('CALL PLAYER MAIN STATSSSSS');
    axios.get(`/api/riot/summonerGameStats/summoner/${summonerId}/mainStats`)
    .then((res) => dispatch(setAveragePlayerMainStats(res.data)))
    .catch( err => console.error(`average player main stats search unsuccessful: ${err} `));
}




