//@flow

import axios from 'axios';

/* ------ actions ------- */

const SET_SEARCHED_SUMMONERS = 'SET_SEARCHED_SUMMONERS';


/* ------ action creators ------ */
const setSearchedSummoners = searchedSummoners => ({ type: SET_SEARCHED_SUMMONERS, searchedSummoners});



/* ------ reducer ------ */
export default function searchedSummonersReducer ( searchedSummoners = [], action){
    let nexState = Object.assign({}, searchedSummoners);
    switch(action.type){
        case SET_SEARCHED_SUMMONERS:
            return action.searchedSummoners;
        default:
            return searchedSummoners;
    }
};

/* ------ dispatcher ------- */
export const updateSearchedSummoners = (region) => dispatch => {
    console.log('search summoner dispatcher', region);
    axios.get(`/api/riot/summoners/${region}`)
    .then((res)=> dispatch(setSearchedSummoners(res.data)))
    .catch( err => console.error(`update searched summoners unsuccessful: ${err}`));
};

