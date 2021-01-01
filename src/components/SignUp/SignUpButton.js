import React, { Component } from 'react';
import '../css/LogInForm.css';


class SignUpButton extends Component {

    render() {
        return(
            <div className="signButton">
                <button 
                    className={this.props.host}
                    disabled={this.props.disabled}
                    onClick={ () => this.props.onClick()}
                    >
                        <i className={this.props.icon}></i>
                        {this.props.text}
                </button>
                
            </div>
            
            
        )
    }
}

export default SignUpButton