import React, { Component } from 'react';
import '../../styles/LogInForm.css';


class LogInButton extends Component {
    render() {
        return(
            <div className="loginButton">
                <button 
                    className="btn"
                    disabled={this.props.disabled}
                    onClick={ () => this.props.onClick()}
                    >
                        {this.props.text}
                </button>
                
            </div>
            
            
        )
    }
}

export default LogInButton