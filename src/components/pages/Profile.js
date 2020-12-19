import React, {useEffect} from 'react';
import NavBar from '../NavBar/NavBar';
import About from '../AboutFooter/About';
import ProfileForm from '../Profile/ProfileForm';

function Profile() {
useEffect(() => console.log('mounted'), []);
  return (
    <div className='hero-container'>
        <NavBar/>
        <ProfileForm/>
        <About/>
    </div>
  );
}

export default Profile;