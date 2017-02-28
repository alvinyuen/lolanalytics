//@flow

import axios from 'axios';

/* ------ actions ------- */

const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

/* ------ action creators ------ */
const setLoggedInUser = user => ({ type: SET_LOGGED_IN_USER, user});
const logOutUser = () => ({ type: LOGOUT_USER });


/* ------ reducer ------ */
export default function userReducer (loggedInUser = {}, action){
    let nexState = Object.assign({}, loggedInUser);
    switch(action.type){
        case SET_LOGGED_IN_USER:
            return action.user;
        case LOGOUT_USER:
            return {};
        default:
            return loggedInUser;
    }
};

/* ------ dispatcher ------- */
export const logInUser = (user) => dispatch => {
    console.log('loggin in user:', user);
    axios.post('/api/login', user)
    .then((res)=> res.data.message ? alert(res.data.message) : window.location.href="/")
    .catch( err => console.error(`log in user unsuccessful: ${err}`));
};

export const checkLoginStatus = (user) => dispatch => {
    axios.get('/api/login/check')
    .then(res => res.data ? dispatch(setLoggedInUser(res.data)) : (window.location.pathname!=='/login' && window.location.pathname!=='/signup')?
    window.location.href='/login' : null)
    .catch( err => console.error(`check log in user unsuccessful: ${err}`));
}

export const signUpUser = (user) => dispatch => {
    axios.post('/api/signup', user)
    .then(res => res.data.message ? alert(res.data.message) : window.location.href="/")
    .then(()=> console.log('sign up complete'))
    .catch(err => console.error(`sign up user unsuccessful: ${err}`));
}

export const logOut = () => dispatch => {
    axios.get(`/api/logout`)
    .then( res => {
        if(res.status===200){
            dispatch(logOutUser());
        }
    })
    .catch(err => console.error(`log out user unsuccessful: ${err}`));
};


