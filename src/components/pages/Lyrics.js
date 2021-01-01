import React from 'react';
import NavBar from '../NavBar/NavBar';
import About from '../AboutFooter/About';
import LyricsHeader from '../Lyrics/LyricsHeader';
import LyricsText from '../Lyrics/LyricsText';

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