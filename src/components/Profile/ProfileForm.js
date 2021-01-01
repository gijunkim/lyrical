import React, { Component } from "react";
import Axios from "axios";

import ProfileStat from "./ProfileStat";
import ProfileContribution from "./ProfileContribution";
import "../css/ProfileForm.css";

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ProfileFormContainer">
        <div className="ProfileFormHeader">
          <h1 className="ProfileFormTitle">USERNAME</h1>
        </div>
        <ProfileStat />
        <ProfileContribution/>
      </div>
    );
  }
}

export default LogInForm;
