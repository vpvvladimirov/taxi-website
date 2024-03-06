import './order-taxi-page.css';
import React from 'react';
import Header from "../../components/header/header";
import MapComponent from "../../components/map/map";
import OrderForm from "../../components/order-form/order-form";
import IsAuthenticated from '../../api/is-authenticated';
import WelcomePage from '../welcome-page/welcome-page';

const OrderTaxiPage = () => {
  const { authenticated } = IsAuthenticated();

  return (
    <>
      {authenticated ? (
        <>
          <Header />
          <div id='order-taxi-container-page'>
            <MapComponent />
            <OrderForm />
          </div>
        </>
      ) : (
        <WelcomePage />
      )}
    </>
  );
}

export default OrderTaxiPage;