import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import About from "../components/AboutFooter/About";
import AddLyricsForm from "../components/AddLyrics/AddLyricsForm";
import { useParams } from "react-router-dom";
import "../styles/AddLyrics.css";

function AddLyrics() {
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
      <div className="AddLyricsHeaderContainer">
        <h1 className="AddLyricsHeader">Add a New Song</h1> 
        <h1 className="AddLyricsHeaderKr">가사를 추가하세요</h1>
      </div>
      <AddLyricsForm/>
      <About />
    </div>
  );
}

export default AddLyrics;
