import './header.css';
import React from 'react';
import vvtLogo from '../../images/vvt-logo.jpg';
import useUserData from '../../api/use-user-data';
import Logout from '../../api/logout';
import { Link } from 'react-router-dom';

const Header = () => {
  const { userData } = useUserData();
  const { logout } = Logout();

  return (
    <header className='vvt-header'>
      <div className='vvt-logo-container'>
        <img className='vvt-logo' src={vvtLogo} alt='VVTaxi' />
      </div>
      <div id='fields-container'>
        <h2 id={userData?.status === 'active' ? 'active-status' : 'busy-status'}>{userData?.status}</h2>
        <div className='user-fields'>
          <Link to='/home'>Home</Link>
          {userData?.profileType === 'admin' &&
            <>
              <Link to='/all-accounts' className='admin-field'>All accounts</Link>
              <Link to='/trips-history' className='admin-field'>Trips history</Link>
            </>
          }
          {userData?.profileType === 'driver' && <Link to='/trips' className='driver-field'>Trips</Link>}
          <Link to='/account-info'>Account</Link>
          <Link onClick={logout}>Logout</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
