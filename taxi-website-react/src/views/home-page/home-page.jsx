import React from 'react';
import IsAuthenticated from '../../api/is-authenticated';
import Header from '../../components/header/header';
import OrderTaxi from '../../components/order-taxi/order-taxi';
import WelcomePage from '../welcome-page/welcome-page';

const HomePage = () => {
  const { authenticated } = IsAuthenticated();

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