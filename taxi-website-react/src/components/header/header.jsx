import './header.css';
import React from 'react';
import HeaderViewModel from './header-viewmodel';
import vvtLogo from '../../images/vvt-logo.jpg';

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