import React from 'react';
import NavBar from '../NavBar/NavBar';
import About from '../AboutFooter/About';
import LogInForm from '../LogIn/LogInForm';

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