import './home-page.css';
import React from 'react';
import IsAuthenticated from '../../api/is-authenticated';
import Header from '../../components/header/header';
import OrderTaxi from '../../components/order-taxi/order-taxi';
import AboutUs from '../../components/about-us/about-us';
import DriversLeaderBoard from '../../components/drivers-leaderboard/drivers-leaderboard';
import WelcomePage from '../welcome-page/welcome-page';

const HomePage = () => {
  const { authenticated } = IsAuthenticated();

  return (
    <>
      {authenticated ? (
        <div id='home-page-container'>
          <Header />
          <OrderTaxi />
          <DriversLeaderBoard />
          <AboutUs />
        </div>
      ) : (
        <WelcomePage />
      )}
    </>
  );
};

export default HomePage;
