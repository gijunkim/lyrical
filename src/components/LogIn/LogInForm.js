import React, { Component } from 'react';
import InputField from "./InputField"
import LogInButton from "./LogInButton"
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
        if (val.length > 12) {
            return;
        }
        this.setState({
            [property]: val
        })
    }

    async doLogin() {
        if (!this.state.username) {
            return;
        }
        if (!this.state.password) {
            return;
        }
        
        this.setState({
            buttonDisabled: true
        })

        try {
            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });
            let result = await res.json();
            if (result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            }
            else if (result && result.success === false) {
                this.resetForm();
                alert(result.msg);
            }

            
        }
        catch (e) {
            console.log(e);
            this.resetForm();
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