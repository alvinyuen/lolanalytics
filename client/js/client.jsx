import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, Redirect, hashHistory, IndexRedirect } from "react-router";

import AppContainer from "./components/app.jsx";

console.log('route jsx running...')

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={AppContainer}>
            <Redirect from="*" to="/" />
        </Route>
    </Router>
    ,document.getElementById("app"));