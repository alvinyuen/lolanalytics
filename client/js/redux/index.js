import { combineReducers } from 'redux';
import loginStatus from './loginStatus';
import singleSummoner from './singleSummoner';
import searchedSummoners from './searchedSummoners';
import { summonerCount, gameCount, championNames } from './summary';

export default combineReducers({
    loginStatus,
    singleSummoner,
    searchedSummoners,
    summonerCount,
    gameCount,
    championNames
});