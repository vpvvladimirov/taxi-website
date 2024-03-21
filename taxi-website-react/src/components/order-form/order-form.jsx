import './order-form.css';
import React from 'react';
import CreateTrip from '../create-trip/create-trip';
import FinishTrip from '../finish-trip/finish-trip';
import ChooseDriver from '../choose-driver/choose-driver';
import FetchClientTrips from '../../api/get-client-trips';
import FetchUnratedTrips from '../../api/get-unrated-trips';

const OrderForm = () => {
  const { activeTrips } = FetchClientTrips();
  const { unratedTrips } = FetchUnratedTrips();

  return (
    <div id="order-taxi-form-container">
      {unratedTrips.length > 0 ? (
        <FinishTrip />
      ) : (activeTrips.length > 0 ? (
        <ChooseDriver />
      ) : (
        <CreateTrip />
      ))}

    </div>
  );
}

export default OrderForm;