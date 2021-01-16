import React, { Component } from "react";
import "../../styles/LogInForm.css";

class InputField extends Component {
  render() {
    return (
      <div className="inputField">
        <input
          className={this.props.error ? "InputError" : "Input"}
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
          onKeyDown={(e) => this.props.onKeyDown(e)}
        ></input>
        {this.props.signUpPw ? (
          <button
            onClick={() => {
              this.props.togglePasswordVisibility();
            }}
          >
            <i className="fas fa-eye"></i>
          </button>
        ) : null}
      </div>
    );
  }
}

export default InputField;
