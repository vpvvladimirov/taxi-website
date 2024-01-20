import './header.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import vvtLogo from '../../images/vvt-logo.jpg';

const Header = () => {
  const [username, setUsername] = useState(null);
  const [userID, setUserID] = useState(null);
  const [profileType, setProfileType] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost/taxi-website-project/taxi-website-php/get-user-data.php', {
          withCredentials: true,
        });

        if (response.status === 200) {
          const data = response.data;
          if (data.success) {
            setUsername(data.username);
            setUserID(data.userID);
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
      <ul className='vvt-logo-container'>
        <button className='vvt-logo-btn' type='button' onClick={logoOnClick}>
          <img className='vvt-logo' src={vvtLogo} alt='VVTaxi' />
        </button>
      </ul>
      {username ? (
        <div className='user-greeting'>
          Hi, {username} with id {userID} and a profile type of {profileType}|
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className='user-greeting'>
          <a href='/login'>Login</a>
        </div>
      )}
    </header>
  );
};

export default Header;
