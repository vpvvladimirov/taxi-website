import './trips.css';
import React from "react";
import FetchTrips from "../../api/get-active-trips";
import AcceptTrip from "../../api/accept-trip";

const Trips = () => {
  const { trips, fetchTrips } = FetchTrips();
  const { acceptTrip, responseMessage } = AcceptTrip();

  return (
    <div id='active-trips-container'>
      <h1 id="active-trips-text">Active Trips</h1>
      <div id='active-trips-list'>
        {trips.length > 0 ? (
          <table id="active-trips-table">
            <thead>
              <tr>
                <th>Trip №</th>
                <th>Pickup Address</th>
                <th>Destination</th>
                <th>Client</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trips.map(trip => (
                <tr key={trip.tripID}>
                  <td>{trip.tripID}</td>
                  <td>{trip.pickupAddress}</td>
                  <td>{trip.dropoffAddress}</td>
                  <td>{trip.firstName} {trip.lastName}</td>
                  <td>
                    <button id="accept-trip-button" onClick={() => acceptTrip(trip.tripID, trip.pickupAddress, trip.dropoffAddress, fetchTrips)}>
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h4>No active trips</h4>
        )}
      </div>
      {responseMessage}
    </div>
  );
};

export default Trips;