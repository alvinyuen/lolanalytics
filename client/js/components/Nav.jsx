import './nav.scss'

import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logOut} from '../redux/loginStatus';

class Nav extends Component {

    constructor(props) {
        super(props);

        this.logOut = this
            .logOut
            .bind(this);
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
                                Sneak Peak
                            </a>
                        </div>
                    </div>

                    <div className="nav-right float-right">
                        <div className="nav-search">
                            <i className="icon ion-search"></i>
                            <input className="nav-search-input" placeholder="Search" type="text"/>
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
        logOutUser: () => dispatch(logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);