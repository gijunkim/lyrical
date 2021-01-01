import React, { Component } from "react";
import "../css/ProfileForm.css";

class ProfileStat extends Component {
  render() {
    return (
      <div className="ProfileStatContainer">
        <div className="StatItemsContainer">
          <p className="StatItem">
            <i className="fas fa-file-alt"></i>
            가사
            <span className="StatNumber">0</span>
          </p>
          <p className="StatItem">
            <i className="fas fa-pencil-alt"></i>
            주석
            <span className="StatNumber">0</span>
          </p>
          <p className="StatItem">
            <i className="fas fa-comments"></i>
            제안
            <span className="StatNumber">0</span>
          </p>
        </div>
      </div>
    );
  }
}

export default ProfileStat;
