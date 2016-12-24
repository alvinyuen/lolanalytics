import { combineReducers } from 'redux';
import loginStatus from './loginStatus';
import singleSummoner from './singleSummoner';
import searchedSummoners from './searchedSummoners';

export default combineReducers({
    loginStatus,
    singleSummoner,
    searchedSummoners});