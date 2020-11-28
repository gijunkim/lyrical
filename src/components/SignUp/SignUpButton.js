import React, { Component } from 'react';
import '../css/LogInForm.css';


class SignUpButton extends Component {

    render() {
        return(
            <div className="signButton">
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

export default SignUpButton