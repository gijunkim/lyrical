import React, { Component } from "react";
import Axios from "axios";

import ProfileStat from "./ProfileStat";
import ProfileContribution from "./ProfileContribution";
import "../css/ProfileForm.css";

import AuthService from "../../services/auth.service";

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;
    console.log(currentUser);
    return (
      <div className="ProfileFormContainer">
        <div className="ProfileFormHeader">
          <h1 className="ProfileFormTitle">{currentUser.user.nickname}</h1>
        </div>
        <ProfileStat />
        <ProfileContribution/>
      </div>
    );
  }
}

export default LogInForm;
