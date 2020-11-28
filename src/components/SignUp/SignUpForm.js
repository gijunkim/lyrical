import React, { Component } from 'react';
import InputField from "../LogIn/InputField"
import SignUpButton from "./SignUpButton"
import '../css/LogInForm.css';


class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            nickname: '',
            name: '',
            buttonDisabled: false
        }
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
                    <h1 className="FormTitle">SIGN UP</h1>
                </div>
                <div className="Form">
                    <h1 className="InputHeader">Lyrical Email</h1>
                    <InputField
                        type="text"
                        placeholder="E-mail"
                        value={this.state.email ? this.state.email : ''}
                        onChange={ (val) => this.setInputValue("email", val) }
                    />
                    <h1 className="InputHeader">Lyrical Password</h1>
                    <InputField
                        type="password"
                        placeholder="Enter Password"
                        value={this.state.password ? this.state.password : ''}
                        onChange={ (val) => this.setInputValue("password", val) }
                    />
                    <h1 className="InputHeader">Lyrical Nickname</h1>
                    <InputField
                        type="text"
                        placeholder="Enter Nickname"
                        value={this.state.nickname ? this.state.nickname : ''}
                        onChange={ (val) => this.setInputValue("nickname", val) }
                    />
                    <h1 className="InputHeader">Lyrical Name</h1>
                    <InputField
                        type="text"
                        placeholder="Enter Full Name"
                        value={this.state.name ? this.state.name : ''}
                        onChange={ (val) => this.setInputValue("name", val) }
                    />
                    <SignUpButton 
                        text='Create Lyrical Account'
                        disabled={this.state.buttonDisabled}
                        onClick={() => this.doLogin()}
                    ></SignUpButton>
                </div>
                <div className="FormOthers">
                    <SignUpButton 
                        text='Sign Up with'
                        disabled={this.state.buttonDisabled}
                        onClick={() => this.doLogin()}
                    ></SignUpButton>
                    <SignUpButton 
                        text='Sign Up with'
                        disabled={this.state.buttonDisabled}
                        onClick={() => this.doLogin()}
                    ></SignUpButton>
                    <SignUpButton 
                        text='Sign Up with'
                        disabled={this.state.buttonDisabled}
                        onClick={() => this.doLogin()}
                    ></SignUpButton>
                </div>
            </div>
            
            
        )
    }
}

export default SignUpForm