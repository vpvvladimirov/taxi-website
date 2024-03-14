import React from 'react';
import './home-page.css';
import IsAuthenticated from '../../api/is-authenticated';
import Header from '../../components/header/header';
import OrderTaxi from '../../components/order-taxi/order-taxi';
import AboutUs from '../../components/about-us/about-us';
import WelcomePage from '../welcome-page/welcome-page';

const HomePage = () => {
  const { authenticated } = IsAuthenticated();

  return (
    <>
      {authenticated ? (
        <div id='home-page-container'>
          <Header />
          <OrderTaxi />
          <div className="triangle-container" onClick={() => {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }}>
            <svg height="60" width="1880">
              <polygon points="0,0 960,50 1900,0" className="triangle" fill='#fbab29' />
            </svg>
          </div>
          <AboutUs />
        </div>
      ) : (
        <WelcomePage />
      )}
    </>
  );
};

export default HomePage;
