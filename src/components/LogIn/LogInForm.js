import React, { Component } from 'react';
import InputField from "./InputField"
import LogInButton from "./LogInButton"
import Axios from 'axios'
import SignUpButton from "../SignUp/SignUpButton"
import { withRouter } from "react-router-dom";

import AuthService from "../../services/auth.service";

import '../css/LogInForm.css';


class LogInForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            buttonDisabled: false,
        }
    }
    
    componentDidMount() {
        if (AuthService.getCurrentUser()) {
            this.props.history.push('/profile');
          }        
    }

    registerGoogle() {
        Axios.get('http://localhost:8081/auth/google', {
        })
        .then((response) => {
                console.log(response.request.responseURL);
                window.location.href=response.request.responseURL;
            });
    }

    registerKakao() {
        Axios.get('http://localhost:8081/auth/kakao', {
        })
        .then((response) => {
                console.log(response.request.responseURL);
                window.location.href=response.request.responseURL;
            });
    }

    setInputValue(property, val) {
        val = val.trim();
        this.setState({
            [property]: val
        })
    }

    doLogin() {
        AuthService.login(this.state.email, this.state.password)
            .then((response) => {
                console.log(response);
                if (response.token) {
                    this.props.history.push("/profile");
                }
            });
    }

    handleEnter(event) {
        if (event.keyCode === 13) {
            this.doLogin();
        }
    }
    
    render() {
        return(
            <div className="FormContainer">
                <div className="FormHeader"> 
                    <h1 className="FormTitle">LOG IN</h1>
                </div>
                <div className="Form">
                    <h1 className="InputHeader">Lyrical Email</h1>
                    <InputField
                        type="text"
                        placeholder="E-mail"
                        value={this.state.email ? this.state.email : ''}
                        error={false}
                        onChange={ (val) => this.setInputValue("email", val) }
                        onKeyDown={(e) => this.handleEnter(e) }
                    />
                    <h1 className="InputHeader">Lyrical Password</h1>
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={this.state.password ? this.state.password : ''}
                        error={false}
                        onChange={ (val) => this.setInputValue("password", val) }
                        onKeyDown={(e) => this.handleEnter(e) }
                    />
                    <LogInButton 
                        text='Log In'
                        disabled={this.state.buttonDisabled}
                        onClick={() => this.doLogin()}
                    ></LogInButton>
                </div>
                <div className="FormOthers">
                    <SignUpButton 
                        text='Log In with Google'
                        disabled={this.state.buttonDisabled}
                        icon="fab fa-google"
                        onClick={() => this.registerGoogle()}
                        host="btnG"
                    >
                    </SignUpButton>
                    <SignUpButton 
                        text='Log In with Kakao'
                        disabled={this.state.buttonDisabled}
                        onClick={() => this.registerKakao()}
                        icon=""
                        host="btnK"
                    ></SignUpButton>
                </div>
            </div>
            
            
        )
    }
}

export default withRouter(LogInForm);