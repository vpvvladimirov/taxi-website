import './order-form.css';
import OrderTaxi from '../../api/order-taxi';
import React from 'react';
import FetchClientTrips from '../../api/get-client-trips';
import AcceptDriver from '../../api/accept-driver';

const OrderForm = () => {
  const { orderData, handleChange, handleSubmit } = OrderTaxi();
  const { activeTrips } = FetchClientTrips();
  const { acceptDriver } = AcceptDriver();

  const handleDriver = (tripID, driverID) => {
    acceptDriver(tripID, driverID);
  };

  return (
    <div id="order-taxi-form-container">
      {activeTrips.length > 0 ? (
        <div>
          <h1 id='accepted-trips-text'>Accepted Trips</h1>
          <div id='accepted-trips-list'>
            <table id='accepted-trips-table'>
              <thead>
                <tr>
                  <th>Trip №</th>
                  <th>Pickup Address</th>
                  <th>Destination</th>
                  <th>Driver №</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeTrips.map(trip => (
                  <>
                    <tr key={trip.activeTripID}>
                      <td>{trip.tripID}</td>
                      <td>{trip.pickupAddress}</td>
                      <td>{trip.dropoffAddress}</td>
                      <td>{trip.driverID}</td>
                      <td>
                        <button id='accept-driver-button' onClick={() => handleDriver(trip.tripID, trip.driverID)}>Accept Driver</button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody >
            </table>
          </div>
        </div>
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
      )}
    </div>
  );
}

export default OrderForm;