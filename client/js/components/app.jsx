import './app.scss'

import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory as history} from "react-router";
import { connect } from 'react-redux';
import { checkLoginStatus } from '../redux/loginStatus'
import { updateSearchedSummoners } from '../redux/searchedSummoners';

//components
import Nav from './Nav.jsx';



// -------- Render ---------- //
class AppContainer extends Component {

    constructor(props){
        super(props);
    }

    //should only run once when component renders?
    componentDidMount(){
        this.props.updateSearchedSummoners('NA');
    }

    componentDidUpdate(){
        this.props.checkLoginStatus();
    }

    render(){
        console.log('APP CONTAINER RENDER')
        return(
            <div>
            <Nav />
                { React.cloneElement(this.props.children, this.props)}
             </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        checkLoginStatus: () => dispatch(checkLoginStatus()),
        updateSearchedSummoners: (region) => dispatch(updateSearchedSummoners(region))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

