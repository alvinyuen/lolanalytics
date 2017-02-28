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
export const updateSearchedSummoners = () => dispatch => {
    axios.get(`/api/riot/es/summoners/allInfo/all`)
    .then((res)=> dispatch(setSearchedSummoners(res.data)))
    .catch( err => console.error(`update searched summoners unsuccessful: ${err}`));
};

/* nav bar search single summoner */
export const searchForSummoner = (summonerName, region) => dispatch => {
    console.log('search summoner dispatcher');
    axios.get(`/api/riot/search/summoner/${region}/${summonerName}`)
    .then((res)=> dispatch(setSearchedSummoners([res.data])))
    .catch( err => console.error(`single summoner search unsuccessful: ${err}`));
};


//with selected options
export const updateSearchedSummonersWithOptions = (region, championName) => dispatch => {
    console.log('region:',region);
    console.log('championName', championName);
    if(region==='ALL' && championName==='ALL'){
        axios.get(`/api/riot/summoners/allInfo/all`)
            .then((res)=> dispatch(setSearchedSummoners(res.data)))
            .catch( err => console.error(`update searched summoners unsuccessful: ${err}`));
    }
    else if(region==='ALL' && championName!=='ALL'){
         axios.get(`/api/riot/summoners/allInfo/champion/${championName}`)
            .then((res)=> dispatch(setSearchedSummoners(res.data)))
            .catch( err => console.error(`update searched summoners unsuccessful: ${err}`));
    }
    else if(region!=='ALL' && championName==='ALL'){
         axios.get(`/api/riot/summoners/allInfo/region/${region}`)
            .then((res)=> dispatch(setSearchedSummoners(res.data)))
            .catch( err => console.error(`update searched summoners unsuccessful: ${err}`));
    }
    else if (region!=='ALL' && championName!=='ALL'){
         axios.get(`/api/riot/summoners/allInfo/regionAndChampion/${region}/${championName}`)
            .then((res)=> dispatch(setSearchedSummoners(res.data)))
            .catch( err => console.error(`update searched summoners unsuccessful: ${err}`));
    }

}

