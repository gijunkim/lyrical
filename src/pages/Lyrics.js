import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import About from '../components/AboutFooter/About';
import LyricsHeader from '../components/Lyrics/LyricsHeader';
import LyricsText from '../components/Lyrics/LyricsText';

function Lyrics() {
  return (
    <div className='hero-container'>
        <NavBar/>
        <LyricsHeader/>
        <LyricsText/>
        <About/>
    </div>
  );
}

export default Lyrics;