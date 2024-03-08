import React from "react";
import FetchTrips from "../../api/get-active-trips";
import AcceptTrip from "../../api/accept-trip";
import './trips.css';

const Trips = () => {
  const { trips, fetchTrips } = FetchTrips();
  const { acceptTrip } = AcceptTrip();

  const handleTrip = (tripID, pickupAddress, dropoffAddress) => {
    acceptTrip(tripID, pickupAddress, dropoffAddress, fetchTrips);
  };

  return (
    <main>
      <div>
        <h1 id="active-trips-text">Active Trips</h1>
        <ul id="trips-list">
          {trips.length > 0 ? (
            trips.map(trip => (
              <li key={trip.tripID}>
                <div>
                  <div>Pickup Address: <strong>{trip.pickupAddress}</strong></div>
                  <div>Destination: <strong>{trip.dropoffAddress}</strong></div>
                </div>
                <button id="accept-trip-button" onClick={() => handleTrip(trip.tripID, trip.pickupAddress, trip.dropoffAddress)}>Accept</button>
              </li>
            ))
          ) : (
            <li>No active trips</li>
          )}
        </ul>
      </div>
    </main>
  );
};

export default Trips;
