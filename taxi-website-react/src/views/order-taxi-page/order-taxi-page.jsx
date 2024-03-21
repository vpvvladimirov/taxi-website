import './order-taxi-page.css';
import React from 'react';
import Header from "../../components/header/header";
import FetchClientTrips from '../../api/get-client-trips';
import FetchUnratedTrips from '../../api/get-unrated-trips';
import FinishTrip from '../../components/finish-trip/finish-trip';
import ChooseDriver from '../../components/choose-driver/choose-driver';
import CreateTrip from '../../components/create-trip/create-trip';
import MapComponent from '../../components/map/map';
import IsAuthenticated from '../../api/is-authenticated';
import WelcomePage from '../welcome-page/welcome-page';

const OrderTaxiPage = () => {
  const { authenticated } = IsAuthenticated();
  const { activeTrips } = FetchClientTrips();
  const { unratedTrips } = FetchUnratedTrips();

  return (
    <>
      {authenticated ? (
        <>
          <Header />
          {unratedTrips.length > 0 ? (
            <FinishTrip />
          ) : (activeTrips.length > 0 ? (
            <ChooseDriver />
          ) : (
            <div id='order-taxi-container-page'>
              <MapComponent />
              <CreateTrip />
            </div>
          ))}
        </>
      ) : (
        <WelcomePage />
      )}
    </>
  );
}

export default OrderTaxiPage;