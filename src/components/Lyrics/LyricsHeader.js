import React, { Component } from "react";
import "../../styles/Lyrics.css";

class LyricsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="LyricsHeaderContainer">
        <div className="LyricsHeaderCard">
          <h1 className="Title">SONG TITLE</h1>
          <h2 className="Artist">ARTIST</h2>
          <p className="Album">Album</p>
          <p className="Date">Release Date</p>
        </div>
      </div>
    );
  }
}

export default LyricsHeader;
