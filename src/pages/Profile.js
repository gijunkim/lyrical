import React, {useEffect} from 'react';
import NavBar from '../components/NavBar/NavBar';
import About from '../components/AboutFooter/About';
import ProfileForm from '../components/Profile/ProfileForm';

function Profile() {
  return (
    <div className='hero-container'>
        <NavBar/>
        <ProfileForm/>
        <About/>
    </div>
  );
}

export default Profile;