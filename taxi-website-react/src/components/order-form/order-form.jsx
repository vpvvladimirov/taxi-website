import './order-form.css';
import React from 'react';
import OrderTaxi from '../../api/order-taxi';
import FinishTrip from '../finish-trip/finish-trip';
import ChooseDriver from '../choose-driver/choose-driver';
import FetchClientTrips from '../../api/get-client-trips';
import FetchUnratedTrips from '../../api/get-unrated-trips';

const OrderForm = () => {
  const { orderData, handleChange, handleSubmit } = OrderTaxi();
  const { activeTrips } = FetchClientTrips();
  const { unratedTrips } = FetchUnratedTrips();

  return (
    <div id="order-taxi-form-container">
      {unratedTrips.length > 0 ? (
        <FinishTrip />
      ) : (activeTrips.length > 0 ? (
        <ChooseDriver />
      ) : (
        <form onSubmit={handleSubmit} id='signup-form' method='post'>
          <div className="form-group">
            <label htmlFor="pickupAddress">Pickup Location:</label>
            <input
              value={orderData.pickupAddress}
              onChange={handleChange}
              type="text"
              id="pickupAddress"
              name="pickupAddress"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dropoffAddress">Destination:</label>
            <input
              value={orderData.dropoffAddress}
              onChange={handleChange}
              type="text"
              id="dropoffAddress"
              name="dropoffAddress"
            />
          </div>
          <button id='create-trip-button' type="submit">Order Taxi</button>
        </form>
      ))}

    </div>
  );
}

export default OrderForm;