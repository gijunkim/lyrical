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
          <h1 className="Title">{this.props.title}</h1>
          <h2 className="Artist">{this.props.artist}</h2>
          <p className="Album">Album</p>
          <p className="Date">{this.props.releaseDate}</p>
        </div>
      </div>
    );
  }
}

export default LyricsHeader;
