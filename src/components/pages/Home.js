import React from 'react';
import NavBar from '../NavBar/NavBar'
import Logo from '../Logo/Logo'
import SearchBar from '../SearchBar/SearchBar';
import Chart from '../Chart/Chart'
import About from '../AboutFooter/About';

function Home() {
  return (
    <div className='hero-container'>
        <NavBar/>
        <Logo/>
        <SearchBar/>
        <Chart/>
        <About/>
    </div>
  );
}

export default Home;