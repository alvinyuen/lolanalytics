import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, Redirect, browserHistory, IndexRedirect } from "react-router";
import { Provider } from 'react-redux';
import store from './store';

import AppContainer from "./components/App.jsx";
import GridContainer from "./components/GridContainer.jsx";
import SignupForm from "./components/SignupForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import PlayerStatsContainer from "./components/stats/PlayerStatsContainer.jsx";

//store
import {checkLoginStatus} from './redux/loginStatus';


console.log('route jsx running...')

const checkStatus = () => {
    console.log('checking login status at root route');
    store.dispatch(checkLoginStatus());
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={AppContainer} onEnter={checkStatus}>
                <IndexRoute component={GridContainer}></IndexRoute>
                <Route path="/signup" component={SignupForm}></Route>
                <Route path="/login" component={LoginForm}></Route>
                <Route path="/playerStats" component={PlayerStatsContainer}></Route>
            </Route>
        </Router>
    </Provider>
    ,document.getElementById("app"));