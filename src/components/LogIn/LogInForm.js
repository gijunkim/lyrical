import React, { Component } from 'react';
import InputField from "./InputField"
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

    setInputValue(property, val) {
        val = val.trim();
        if (val.length > 12) {
            return;
        }
        this.setState({
            [property]: val
        })
    }

    render() {
        
        return(
            <div className="FormContainer">
                <div className="FormHeader"> 
                    <h1 className="FormTitle">LOG IN</h1>
                </div>
                <div className="Form">
                    <InputField
                        type="text"
                        placeholder="E-mail"
                        value={this.state.email ? this.state.email : ''}
                        onChange={ (val) => this.setInputValue("email", val) }
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={this.state.password ? this.state.password : ''}
                        onChange={ (val) => this.setInputValue("password", val) }
                    />
                </div>
            </div>
            
            
        )
    }
}

export default LogInForm