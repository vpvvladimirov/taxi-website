import './header.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import vvtLogo from '../../images/vvt-logo.jpg';

const Header = () => {
  const [profileType, setProfileType] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost/taxi-website-project/taxi-website-php/get_user_data.php', {
          withCredentials: true,
        });

        if (response.status === 200) {
          const data = response.data;
          if (data.success) {
            setProfileType(data.profileType);
          }
        }
      } catch (error) {
        console.log('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost/taxi-website-project/taxi-website-php/logout.php', {
        withCredentials: true,
      });

      if (response.status === 200) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.log('Error logging out', error);
    }
  };

  const logoOnClick = () => {
    window.location.href = '/';
  };

  return (
    <header className='vvt-header'>
      <div className='vvt-logo-container'>
        <button className='vvt-logo-btn' type='button' onClick={logoOnClick}>
          <img className='vvt-logo' src={vvtLogo} alt='VVTaxi' />
        </button>
      </div>
      <div className='user-fields'>
        <a href='/home'>Home</a>
        {profileType === 'admin' && <a href='/all-accounts' className='admin-field'>All accounts</a>}
        {(profileType === 'admin' || profileType === 'driver') && <a href='/trips' className='driver-field'>Trips</a>}
        <a href='/account-info'>Account</a>
        <a onClick={handleLogout}>Logout</a>
      </div>
    </header>
  );
};

export default Header;