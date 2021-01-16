import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import About from '../components/AboutFooter/About';
import SignUpForm from '../components/SignUp/SignUpForm';

function SignUp() {
  return (
    <div className='hero-container'>
        <NavBar/>
        <SignUpForm/>
        <About/>
    </div>
  );
}

export default SignUp;