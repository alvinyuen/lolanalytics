import './signupForm.scss'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logInUser, signUpUser, checkLoginStatus } from '../redux/loginStatus';
import axios from 'axios';


class SignupForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }


    handleInput(e){
        this.setState({[e.target.name]: e.target.value});
    }

    submitForm(e){
        e.preventDefault();
        this.props.signUpUser(this.state);
    }

    render(){
        return (
            <div className="signup-main-container">
                        <div className="signup-container">
                            <div className="signup-title-container">
                            <h1 className="signup-title">CREATE ACCOUNT</h1>
                            </div>
                            <form className="form" onSubmit={(e)=>{this.submitForm(e)}}>
                                <div className="form-group">
                                    <label className="form-label" >First Name</label>
                                    <input type="text" name="firstName" placeholder="First name" className="input" onChange={(e)=> {this.handleInput(e)}} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" >Last Name</label>
                                    <input type="text" name="lastName" placeholder="Last name" className="input" onChange={(e)=> {this.handleInput(e)}}  />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" >Email / Username</label>
                                    <input type="text" name="email" placeholder="Email" className="input" onChange={(e)=> {this.handleInput(e)}}  />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Password</label>
                                    <input type="password" name="password" className="input" placeholder="Password" onChange={(e)=> {this.handleInput(e)}}  />
                                </div>
                                <div className="form-group">
                                    <button className="facebook-button"><i className="ion-social-facebook"></i> Login with facebook </button>
                                </div>
                                <div className="form-group">
                                    <button className="google-button"><i className="ion-social-google"></i> Login with google</button>
                                </div>

                                <a href="/"><label className="password-label" > Forgot Password? </label></a>
                                <div className="form-group">
                                    <button id="signup-button" title="signup" type="submit" className="signup-button">SIGN UP</button>
                                </div>
                            </form>

                        </div>
             </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        checkLoginStatus: () => dispatch(checkLoginStatus()),
        signUpUser: (user) => dispatch(signUpUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);