import React from 'react';
import HomePageViewModel from './home-page-viewmodel';
import Header from '../../components/header/header';
import WelcomePage from '../welcome-page/welcome-page';
import OrderTaxi from '../../components/order-taxi/order-taxi';

const HomePage = () => {
  const { authenticated } = HomePageViewModel();

  return (
    <>
      {authenticated ? (
        <div>
          <Header />
          <OrderTaxi />
        </div>
      ) : (
        <WelcomePage />
      )}
    </>
  );
};

export default HomePage;