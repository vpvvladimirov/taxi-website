import './header.css';
import React from 'react';
import vvtLogo from '../../images/vvt-logo.jpg';
import useUserData from '../../api/use-user-data';
import useLogout from '../../api/logout';
import { Link } from 'react-router-dom';

const Header = () => {
  const { userData } = useUserData();
  const logout = useLogout();

  const profileType = userData?.profileType;

  return (
    <header className='vvt-header'>
      <div className='vvt-logo-container'>
        <img className='vvt-logo' src={vvtLogo} alt='VVTaxi' />
      </div>
      <div className='user-fields'>
        <Link to='/home'>Home</Link>
        {profileType === 'admin' && <a href='/all-accounts' className='admin-field'>All accounts</a>}
        {(profileType === 'admin' || profileType === 'driver') && <a href='/trips' className='driver-field'>Trips</a>}
        <Link to='/account-info'>Account</Link>
        <Link onClick={logout}>Logout</Link>
      </div>
    </header>
  );
};

export default Header;
