import React from "react";
import TripsViewModel from "./trips-viewmodel";

const Trips = () => {
  const { trips } = TripsViewModel();

  return (
    <main>
      <h2>Active Trips</h2>
      <ul>
        {trips.length > 0 ? (
          trips.map(trip => (
            <li key={trip.tripID}>
              <div>Pickup Address: {trip.pickupAddress}</div>
              <div>Destination: {trip.dropoffAddress}</div>
            </li>
          ))
        ) : (
          <li>No active trips</li>
        )}
      </ul>
    </main>
  );
};

export default Trips;
