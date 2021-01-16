import React, { Component } from "react";
import "../../styles/Lyrics.css";

class LyricsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLyrics() {
    let lyricsLine,
      lyrics = [];
    if (typeof this.props.lyrics == "string") {
      lyricsLine = this.props.lyrics.split("\n");
      console.log(lyricsLine);
      for (let i = 0; i < lyricsLine.length; i++) {
        if (lyricsLine[i] == "") {
          lyrics.push(<br />);
        } else {
          lyrics.push(
            <p key={i} className="Lyrics">
              {lyricsLine[i]}
            </p>
          );
        }
      }
      console.log(lyrics, "lyrics");
    }
    return lyrics;
  }

  render() {
    let lyrics;
    if (typeof this.props.lyrics == "string") {
      console.log("hi");
      lyrics = this.props.lyrics.split("\n").join("<br/>");
    }
    return (
      <div className="LyricsTextContainer">
        <div className="LyricsTextCard">{this.renderLyrics()}</div>
      </div>
    );
  }
}

export default LyricsHeader;
