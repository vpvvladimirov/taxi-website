import './header.css';
import React from 'react';
import HeaderViewModel from './header-viewmodel';
import vvtLogo from '../../images/vvt-logo.jpg';
import { Link } from 'react-router-dom';

const Header = () => {
  const { profileType, handleLogout } = HeaderViewModel();

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
        <Link to='/home'>Home</Link>
        {profileType === 'admin' && <a href='/all-accounts' className='admin-field'>All accounts</a>}
        {(profileType === 'admin' || profileType === 'driver') && <a href='/trips' className='driver-field'>Trips</a>}
        <Link to='/account-info'>Account</Link>
        <Link onClick={handleLogout}>Logout</Link>
      </div>
    </header>
  );
};

export default Header;