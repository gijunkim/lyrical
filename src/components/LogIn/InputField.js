import React, { Component } from 'react';
//import '../css/LogInForm.css';


class InputField extends Component {

    render() {
        return(
            <div className="inputField">
                <input 
                    className="input"
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={ (e) => this.props.onChange(e.target.value)}
                    >
                </input>
                
            </div>
            
            
        )
    }
}

export default InputField