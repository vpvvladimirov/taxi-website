import './order-form.css';
import OrderTaxi from '../../api/order-taxi';
import React from 'react';
import FetchClientTrips from '../../api/get-client-trips';

const OrderForm = () => {
  const { orderData, handleChange, handleSubmit } = OrderTaxi();
  const { trips } = FetchClientTrips();

  return (
    <div id="order-taxi-form-container">
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
      <div>
        <h1>Accepted Trips</h1>
        <ul id='accepted-trips-list'>
          {trips.length > 0 ? (
            trips.map(trip => (
              <li key={trip.activeTripID}>
                <div>Driver: {trip.driverID}</div>
                <div>Pickup Address: {trip.pickupAddress}</div>
                <div>Destination: {trip.dropoffAddress}</div>
              </li>
            ))
          ) : (
            <li>No active trips</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default OrderForm;