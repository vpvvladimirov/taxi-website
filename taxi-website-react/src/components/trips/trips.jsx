import React from "react";
import TripsViewModel from "./trips-viewmodel";

const Trips = () => {
  const { trips, acceptTrip } = TripsViewModel();

  const handleTrip = (tripID) => {
    acceptTrip(tripID);
  }

  return (
    <main>
      <div>
        <h2>Active Trips</h2>
        <ul>
          {trips.length > 0 ? (
            trips.map(trip => (
              <>
                <li key={trip.tripID}>
                  <div>Pickup Address: {trip.pickupAddress}</div>
                  <div>Destination: {trip.dropoffAddress}</div>
                </li>
                <button onClick={() => handleTrip(trip.tripID)}>Accept Trip</button>
              </>
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
