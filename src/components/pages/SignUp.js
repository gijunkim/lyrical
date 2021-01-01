import React from 'react';
import NavBar from '../NavBar/NavBar';
import About from '../AboutFooter/About';
import SignUpForm from '../SignUp/SignUpForm';

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