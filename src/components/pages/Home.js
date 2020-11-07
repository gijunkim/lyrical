import React from 'react';
import NavBar from '../NavBar/NavBar'
import Logo from '../Logo/Logo'
import SearchBar from '../SearchBar/SearchBar';

function Home() {
  return (
    <div className='hero-container'>
        <NavBar/>
        <Logo/>
        <SearchBar/>
    </div>
  );
}

export default Home;