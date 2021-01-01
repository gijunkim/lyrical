import React, { Component } from "react";
import "../css/Lyrics.css";

class LyricsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="LyricsTextContainer">
        <div className="LyricsTextCard">
          <p className="Lyrics">
            [Chorus] They say these bars are like COVID (Bars are like COVID;
            what?)<br></br>
            You get 'em right off the bat (You get 'em right off the bat; yeah)
            <br></br>
            Infected with SARS and Corona (Infected with SARS and Corona)
            <br></br>
            Like you took a bite off of that (You took a bite off of that; damn)
            <br></br>
            And it goes from martian to human (From martian to human; yeah)
            <br></br>
            That's how the virus attacks (That's how the virus attacks)<br></br>
            They come at me with machine guns (At me with machine guns; brr)
            <br></br>
            Like trying to fight off a gnat
            <br></br>
            <br></br>
            [Verse 1] Still stackin' my chips, hoes<br></br>
            Higher than Shaq on his tiptoes<br></br>
            Atop the Empire State Buildin'<br></br>
            This shit is like child's play, children<br></br>I will
            anni-nihilate, kill them<br></br>
            I'll fuck around and pile eight million<br></br>
            Dead little juveniles, wait, chill, then<br></br>
          </p>
        </div>
      </div>
    );
  }
}

export default LyricsHeader;
