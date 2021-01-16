import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import About from '../components/AboutFooter/About';
import LogInForm from '../components/LogIn/LogInForm';

function LogIn() {
  return (
    <div className='hero-container'>
        <NavBar/>
        <LogInForm/>  
        <About/>
    </div>
  );
}

export default LogIn;