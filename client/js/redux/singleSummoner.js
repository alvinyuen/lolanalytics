//@flow

import axios from 'axios';

/* ------ actions ------- */

const SET_SINGLE_SUMMONER = 'SET_SINGLE_SUMMONER';


/* ------ action creators ------ */
const setSingleSummoner = singleSummoner => ({ type: SET_SINGLE_SUMMONER, singleSummoner});



/* ------ reducer ------ */
export default function singleSummonerReducer (singleSummoner = {}, action){
    let nexState = Object.assign({}, singleSummoner);
    switch(action.type){
        case SET_SINGLE_SUMMONER:
            return action.singleSummoner;
        default:
            return singleSummoner;
    }
};

/* ------ dispatcher ------- */
export const searchForSummoner = (summonerName, region) => dispatch => {
    console.log('search summoner dispatcher');
    axios.get(`/api/riot/search/summoner/${region}/${summonerName}`)
    .then((res)=> console.log('res from dis:', res))
    .catch( err => console.error(`single summoner search unsuccessful: ${err}`));
};




