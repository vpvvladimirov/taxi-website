import './header.css';
import React, { useState } from 'react';
import vvtLogo from '../../images/vvt-logo.jpg';
import useUserData from '../../api/use-user-data';
import Logout from '../../api/logout';
import { Link } from 'react-router-dom';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ClearIcon from '@mui/icons-material/Clear';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

const Header = () => {
  const { userData } = useUserData();
  const { logout } = Logout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='vvt-header'>
      <div className='vvt-logo-container'>
        <img className='vvt-logo' src={vvtLogo} alt='VVTaxi' />
      </div>
      <div className='menu-toggle' onClick={toggleMenu}>
        {isMenuOpen ? (
          <ClearIcon className='menu-icon' fontSize='large' />
        ) : (
          <DehazeIcon className='menu-icon' fontSize='large' />
        )}
      </div>
      {isMenuOpen && (
        <div className='menu'>
          <h1>Menu</h1>
          <div className='menu-items'>
            <Link to='/home'><HomeIcon />Home</Link>
            {userData?.profileType === 'admin' && (
              <>
                <Link to='/all-accounts' className='admin-field'><PeopleIcon />All accounts</Link>
                <Link to='/trips-history' className='admin-field'><LocalTaxiIcon />Trips history</Link>
              </>
            )}
            {userData?.profileType === 'driver' && <Link to='/trips' className='driver-field'><DirectionsCarIcon />Trips</Link>}
            <Link to='/account-info'><ManageAccountsIcon />Account</Link>
            <Link onClick={logout}><LogoutIcon />Logout</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;