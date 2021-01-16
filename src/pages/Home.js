import React from 'react';
import NavBar from '../components/NavBar/NavBar'
import Logo from '../components/Logo/Logo'
import SearchBar from '../components/SearchBar/SearchBar';
import Chart from '../components/Chart/Chart'
import About from '../components/AboutFooter/About';

function Home() {
  return (
    <div className='hero-container'>
        <NavBar/>
        <Logo/>
        <SearchBar/>
        <Chart />
        <About/>
    </div>
  );
}

export default Home;