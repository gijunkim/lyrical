import React, { Component } from "react";
import "../../styles/AddLyrics.css";
import { withRouter } from "react-router-dom";
import InputField from "../LogIn/InputField";
import LogInButton from "../LogIn/LogInButton";

class AddLyricsForm extends Component {
  constructor(props) {
    super(props);
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      this.doLogin();
    }
  }

  render() {
    return (
      <div className="AddFormContainer">
        <div className="AddForm">
          <div className="InputHeaderContainer">
            <h1 className="InputHeader">Artist (아티스트)</h1>
          </div>
          <InputField
            type="text"
            placeholder="Artist | 아티스트 | 가수"
            onKeyDown={(e) => this.handleEnter(e)}
          />
          <div className="InputHeaderContainer">
            <h1 className="InputHeader">Title (제목)</h1>
          </div>
          <InputField
            type="text"
            placeholder="Title | 제목"
            onKeyDown={(e) => this.handleEnter(e)}
          />
          <div className="InputHeaderContainer">
            <h1 className="InputHeader">Genre (장르)</h1>
          </div>

          <label>
            Pop
            <input name="isGoing" type="checkbox" />
          </label>
          <label>
            Hip-hop
            <input name="isGoing" type="checkbox" />
          </label>
          <label>
            Rock
            <input name="isGoing" type="checkbox" />
          </label>
          <label>
            Ballad
            <input name="isGoing" type="checkbox" />
          </label>
          <label>
            Jazz
            <input name="isGoing" type="checkbox" />
          </label>

          <div className="InputHeaderContainer">
            <h1 className="InputHeader">Lyrics (가사)</h1>
          </div>
          <InputField
            type="text"
            placeholder="Title | 제목"
            onKeyDown={(e) => this.handleEnter(e)}
          />
          <div className="InputHeaderContainer">
            <h1 className="InputHeader">Release Date (발매일)</h1>
          </div>
        </div>
        <div className="FormOthers">
          <LogInButton text="Submit" disabled={false}></LogInButton>
        </div>
      </div>
    );
  }
}

export default withRouter(AddLyricsForm);
