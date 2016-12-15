import './app.scss'

import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory as history} from "react-router";



// -------- Render ---------- //
class AppContainer extends Component {

    constructor(props){
        super(props);
    }

    render(){
        console.log('APP CONTAINER RENDER')
        return(
            <div className="test" >TESTING THIS BACKEND PAGE</div>
        )
    }
}

export default AppContainer;