import './nav.scss'

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from '../redux/loginStatus';
import { searchForSummoner } from '../redux/searchedSummoners';

class Nav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchSummoner: '',
            region: 'NA',
        }

        this.handleInput = this.handleInput.bind(this);
        this.logOut = this.logOut.bind(this);
        this.searchForSummoner = this.searchForSummoner.bind(this);
    }

    handleInput(e){
        console.log('type:', e.target.name);
        this.setState({[e.target.name]: e.target.value});
    }

    searchForSummoner(){
        console.log('search:', this.state.searchSummoner);
        this.props.search(this.state.searchSummoner, this.state.region);
    }


    logOut(){
        this.props.logOutUser();
    }

    render() {
        return (
            <div className="nav">
                <div className="container clearfix">
                    <div className="nav-logo">
                        <i className="ion-social-dribbble"></i>
                    </div>
                    <div className="nav-title float-left">
                        <div className="nav-title-item">
                            <a className="nav-title-link" href="/">
                                Riot Analytics
                            </a>
                        </div>
                    </div>

                    <div className="nav-right float-right">
                        <div className="nav-search">
                            <i className="icon ion-search" onClick={this.searchForSummoner}></i>
                            <input className="nav-search-input" placeholder="Search" type="text" name="searchSummoner"
                            onChange = {this.handleInput}/>
                        </div>

                      {!this.props.isLoggedIn ?
                          <div className = "nav-authen">
                        <div className="nav-login">
                            <div className="nav-login-title">
                                <Link className="nav-login-link" to="/login">Log In
                                </Link>
                            </div>
                        </div>
                        <div className="nav-signup">
                            <div className="nav-signup-title">
                                <Link className="nav-signup-link" to="/signup">Sign Up
                                </Link>
                            </div>
                        </div>
                        </div> :
                        <div className="nav-logout">
                            <div className="nav-signout-title">
                            {`Welcome, ${this.props.isLoggedIn.firstName}`}&nbsp;&nbsp;
                            <Link className="nav-logout-link" to="/login" onClick={this.logOut}>Log Out</Link>

                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    const isLoggedIn = (Object.keys(state.loginStatus).length) ? state.loginStatus : false;
    return {isLoggedIn}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logOutUser: () => dispatch(logOut()),
        search: (summoner, region) => dispatch(searchForSummoner(summoner, region))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);