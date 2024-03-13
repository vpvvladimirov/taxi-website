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
        {/*
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="300.000000pt" height="300.000000pt" viewBox="0 0 300.000000 300.000000"
        preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)" fill="#000000" stroke="none">
            <path d="M2806 4262 c-7 -29 -33 -39 -121 -47 -155 -12 -193 -59 -226 -285 -25 -167 -28 -173 -91 -200 -105 -44 -130 -117 -124 -365 6 -206 8 -215 51 -221 39 -6 45 -19 45 -91 0 -101 26 -133 110 -133 84 0 110 32 110 134 l0 86 400 0 400 0 0 -86 c0 -100 26 -134 102 -134 102 0 118 17 118 122 0 91 3 98 50 98 l50 0 0 238 c0 256 -41 362 -140 362 -43 0 -48 15 -81 216 -31 197 -75 247 -224 259 -88 8 -114 18 -121 47 -9 33 -30 38 -154 38 -124 0 -145 -5 -154 -38z m509 -187 c11 -14 25 -61 32 -105 6 -44 18 -109 25 -145 l13 -65 -425 0 -424 0 11 45 c6 25 17 86 25 135 25 167 8 160 386 160 246 0 342 -7 357 -25z m-799 -559 c77 -77 -18 -209 -113 -157 -82 43 -46 181 47 181 23 0 53 -11 66 -24z m1031 -18 c66 -94 -56 -206 -136 -127 -37 38 -41 111 -7 145 38 38 111 28 143 -18z" />
            <path d="M3880 2970 l0 -70 950 0 950 0 0 70 0 70 -950 0 -950 0 0 -70z" />
            <path d="M140 2960 l0 -60 950 0 950 0 0 60 0 60 -950 0 -950 0 0 -60z" />
            <path d="M4339 2575 c-1 -3 -5 -39 -8 -80 l-7 -75 98 0 98 0 0 80 0 80 -90 0 c-49 0 -91 -2 -91 -5z" />
            <path d="M1360 2544 c0 -32 235 -647 255 -667 11 -11 49 -17 85 -13 65 6 66 7 186 333 l120 327 123 -327 122 -327 79 0 79 0 121 328 c103 282 121 317 126 255 l6 -73 99 0 99 0 0 -260 0 -260 90 0 90 0 0 260 0 260 100 0 100 0 0 90 0 90 -389 0 -390 0 -52 -175 c-28 -96 -59 -197 -67 -225 l-15 -50 -15 60 c-8 33 -38 135 -66 226 l-51 165 -192 -5 -192 -6 -59 -205 c-69 -237 -67 -237 -141 20 l-57 195 -97 0 c-53 0 -97 -7 -97 -16z" />
            <path d="M3276 2349 c-70 -38 -41 -142 33 -118 95 31 176 34 193 6 28 -44 23 -47 -94 -47 -97 0 -118 -7 -160 -56 -138 -161 57 -350 244 -236 60 37 62 37 85 0 53 -86 163 -50 163 52 0 50 -9 90 -20 90 -11 0 -20 50 -20 112 0 201 -225 305 -424 197z m238 -281 c13 -35 -24 -67 -80 -68 -45 0 -69 59 -32 82 44 28 98 21 112 -14z" />
            <path d="M3791 2325 c20 -30 58 -88 84 -129 l49 -74 -82 -114 c-102 -143 -102 -148 6 -148 80 0 92 7 131 73 l43 73 50 -73 c43 -63 60 -73 129 -73 98 0 98 16 0 154 l-79 110 79 117 c98 144 98 139 -10 139 -80 0 -94 -7 -121 -60 -39 -75 -51 -75 -94 0 -30 53 -45 60 -127 60 l-94 0 36 -55z" /> <path d="M4329 2125 l2 -255 90 0 89 0 6 255 5 255 -97 0 -97 0 2 -255z" />
          </g>
        </svg>
        */}
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
