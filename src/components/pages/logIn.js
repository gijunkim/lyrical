import React from 'react';
import NavBar from '../NavBar/NavBar';
import About from '../AboutFooter/About';
import LogInForm from '../LogIn/LogInForm';

import AuthService from '../../services/auth.service';

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