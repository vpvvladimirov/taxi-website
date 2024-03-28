import './order-taxi-page.css';
import React from 'react';
import Header from "../../components/header/header";
import FetchClientTrips from '../../api/get-client-trips';
import FetchUnratedTrips from '../../api/get-unrated-trips';
import FetchAwaitingTrips from '../../api/get-awaiting-trips';
import FinishTrip from '../../components/finish-trip/finish-trip';
import ChooseDriver from '../../components/choose-driver/choose-driver';
import CancelTrip from '../../api/cancel-trip';
import CreateTrip from '../../components/create-trip/create-trip';
import MapComponent from '../../components/map/map';
import IsAuthenticated from '../../api/is-authenticated';
import WelcomePage from '../welcome-page/welcome-page';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const OrderTaxiPage = () => {
  const { authenticated } = IsAuthenticated();
  const { activeTrips } = FetchClientTrips();
  const { unratedTrips } = FetchUnratedTrips();
  const { awaitingTrips } = FetchAwaitingTrips();
  const { cancelTrip } = CancelTrip();

  return (
    authenticated ? (
      <>
        <Header />
        {unratedTrips.length > 0 ? (
          <FinishTrip />
        ) : (activeTrips.length > 0 ? (
          <ChooseDriver />
        ) : (awaitingTrips.length > 0 ? (
          <div id='awaiting-drivers-container'>
            <h1>Waiting for drivers to accept your trip</h1>
            <Box>
              <CircularProgress />
            </Box>
            <button id='cancel-trip-button' onClick={() => cancelTrip()}>Cancel Trip</button>
          </div>
        ) : (
          <div id='order-taxi-container'>
            <MapComponent />
            <CreateTrip />
          </div>
        )))}
      </>
    ) : (
      <WelcomePage />
    )
  );
}

export default OrderTaxiPage;