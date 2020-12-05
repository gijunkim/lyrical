import React, { Component } from 'react';
import InputField from "../LogIn/InputField"
import SignUpButton from "./SignUpButton"
import Axios from 'axios'
import '../css/LogInForm.css';


class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            nickname: '',
            name: '',
            
            buttonDisabled: false,

            emailError: false,
            passwordError: false,
            nicknameError: false,
            nameError: false,

            liveCheck: false
        }
    }

    register() {
        let error = false;

        if (!this.checkEmailValid(this.state.email)) {
            this.setState({
                emailError: true,
                liveCheck: true
            });
            error = true;
        }
        if (!this.checkEmptyValid(this.state.password)) {
            this.setState({
                passwordError: true,
                liveCheck: true
            });
            error = true;
        }
        if (!this.checkEmptyValid(this.state.nickname)) {
            this.setState({
                nicknameError: true,
                liveCheck: true
            });
            error = true;
        }
        if (!this.checkEmptyValid(this.state.name)) {
            this.setState({
                nameError: true,
                liveCheck: true
            });
            error = true;
        }

        console.log(this.state.emailError);
        
        if (!error) {
                Axios.post('http://localhost:8081/auth/join', {
                nickname: this.state.nickname,
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }).then((response) => {
                console.log(response);
            });
        }
    }

    checkEmailValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    checkEmptyValid(password) {
        return password != '';
    }

    //이메일 중복체크 포스트
    checkEmailDuplicate() {
        Axios.post('http://localhost:8081/user/exist', {
            email: this.state.email,
        }).then((response) => {
            console.log(response);
        });
    }

    setInputValue(property, val) {
        //Email Live Validation
        if (property=='email' && this.state.liveCheck) {
            if (this.checkEmailValid(val)) {
                this.setState({
                    emailError: false
                });
                this.renderHeaderError(this.state.emailError, "이메일을");
            } else {
                this.setState({
                    emailError: true
                })
                this.renderHeaderError(this.state.emailError, "이메일을");
            }
        }

        //Password Live Validation
        if (property=='password' && this.state.liveCheck) {
            if (this.checkEmptyValid(val)) {
                this.setState({
                    passwordError: false
                });
                this.renderHeaderError(this.state.passwordError, "비밀번호를");
            } else {
                this.setState({
                    passwordError: true
                });
                this.renderHeaderError(this.state.passwordError, "비밀번호를");
            }
        }
        
        //Nickname Live Validation
        if (property=='nickname' && this.state.liveCheck) {
            if (this.checkEmptyValid(val)) {
                this.setState({
                    nicknameError: false
                });
                this.renderHeaderError(this.state.nicknameError, "닉네임을");
            } else {
                this.setState({
                    nicknameError: true
                });
                this.renderHeaderError(this.state.nicknameError, "닉네임을");
            }
        }

        //Name Live Validation
        if (property=='name' && this.state.liveCheck) {
            if (this.checkEmptyValid(val)) {
                this.setState({
                    nameError: false
                });
                this.renderHeaderError(this.state.nameError, "이름을");
            } else {
                this.setState({
                    nameError: true
                });
                this.renderHeaderError(this.state.nameError, "이름을");
            }
        }

        val = val.trim();
        this.setState({
            [property]: val
        })
    }

    //주의 경고 컨디셔널 렌더링
    renderHeaderError(property, val) {
        if(property) {
            return (<p className="InputHeaderError">{val} 입력하세요</p>);
        } else {
            return null;
        }
    }

    render() {   
        return(
            <div className="FormContainer">
                <div className="FormHeader"> 
                    <h1 className="FormTitle">SIGN UP</h1>
                </div>
                <div className="Form">
                    <div className="InputHeaderContainer">
                    <h1 className="InputHeader">Lyrical Email</h1>
                    {this.renderHeaderError(this.state.emailError, "이메일을")}
                    </div>
                    <InputField
                        type="text"
                        placeholder="E-mail"
                        value={this.state.email ? this.state.email : ''}
                        error={this.state.emailError}
                        onChange={ (val) => this.setInputValue("email", val) }
                    />
                    <div className="InputHeaderContainer">
                    <h1 className="InputHeader">Lyrical Password</h1>
                    {this.renderHeaderError(this.state.passwordError, "비밀번호를")}
                    </div>
                    <InputField
                        type="password"
                        placeholder="Enter Password"
                        value={this.state.password ? this.state.password : ''}
                        error={this.state.passwordError}
                        onChange={ (val) => this.setInputValue("password", val) }
                    />
                    <div className="InputHeaderContainer">
                    <h1 className="InputHeader">Lyrical Nickname</h1>
                    {this.renderHeaderError(this.state.nicknameError, "닉네임을")}
                    </div>
                    <InputField
                        type="text"
                        placeholder="Enter Nickname"
                        value={this.state.nickname ? this.state.nickname : ''}
                        error={this.state.nicknameError}
                        onChange={ (val) => this.setInputValue("nickname", val) }
                    />
                    <div className="InputHeaderContainer">
                    <h1 className="InputHeader">Full Name</h1>
                    {this.renderHeaderError(this.state.nameError, "이름을")}
                    </div>
                    <InputField
                        type="text"
                        placeholder="Enter Full Name"
                        value={this.state.name ? this.state.name : ''}
                        error={this.state.nameError}
                        onChange={ (val) => this.setInputValue("name", val) }
                    />
                    <SignUpButton 
                        text='Create Lyrical Account'
                        disabled={this.state.buttonDisabled}
                        onClick={() => this.register()}
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