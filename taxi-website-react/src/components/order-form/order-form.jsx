import './order-form.css';
import OrderTaxi from '../../api/order-taxi';
import React from 'react';
import FetchClientTrips from '../../api/get-client-trips';

const OrderForm = () => {
  const { orderData, handleChange, handleSubmit } = OrderTaxi();
  const { trips } = FetchClientTrips();

  return (
    <div id="order-taxi-form-container">
      {trips.length > 0 ? (
        <div>
          <h1 id='accepted-trips-text'>Accepted Trips</h1>
          <div id='accepted-trips-list'>
            <table id='accepted-trips-table'>
              <thead>
                <th>Driver</th>
                <th>Pickup Address</th>
                <th>Destination</th>
                <th>Action</th>
              </thead>
              <tbody>
                {trips.map(trip => (
                  <>
                    <br />
                    <tr key={trip.activeTripID}>
                      <td>Driver: {trip.driverID}</td>
                      <td>Pickup Address: {trip.pickupAddress}</td>
                      <td>Destination: {trip.dropoffAddress}</td>
                      <td>
                        <button id='accept-driver-button'>Accept Driver</button>
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