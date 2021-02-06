import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import About from "../components/AboutFooter/About";
import LyricsHeader from "../components/Lyrics/LyricsHeader";
import LyricsText from "../components/Lyrics/LyricsText";
import { useParams } from "react-router-dom";

function Lyrics() {
  const { artist, title } = useParams();

  const [artistName, setArtistName] = useState();
  const [songName, setSongName] = useState();
  const [releaseDate, setReleaseDate] = useState();
  const [lyrics, setLyrics] = useState();

  useEffect(() => {
    fetch(`http://localhost:8081/song/${artist}/${title}`)
      .then((res) => res.json())
      .then((data) => {
        setArtistName(data.artist.name);
        setSongName(data.song.title);
        setReleaseDate(data.song.release);
        setLyrics(data.song.lyrics);
      });
  });

  return (
    <div className="hero-container">
      <NavBar />
      <LyricsHeader
        artist={artistName}
        title={songName}
        releaseDate={releaseDate}
      />
      <LyricsText lyrics={lyrics} />
      <About />
    </div>
  );
}

export default Lyrics;
