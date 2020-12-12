import React, { Component } from 'react';
import InputField from "./InputField"
import LogInButton from "./LogInButton"
import Axios from 'axios'
import SignUpButton from "../SignUp/SignUpButton"

import '../css/LogInForm.css';


class LogInForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            buttonDisabled: false
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
        Axios.post('http://localhost:8081/auth/login', {
                email: this.state.email,
                password: this.state.password
            }).then((response) => {
                console.log(response);
            });
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
                    />
                    <h1 className="InputHeader">Lyrical Password</h1>
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={this.state.password ? this.state.password : ''}
                        error={false}
                        onChange={ (val) => this.setInputValue("password", val) }
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

export default LogInForm