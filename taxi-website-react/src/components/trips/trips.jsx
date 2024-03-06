import React from "react";
import FetchTrips from "../../api/get-active-trips";
import AcceptTrip from "../../api/accept-trip";

const Trips = () => {
  const { trips, fetchTrips } = FetchTrips();
  const { acceptTrip } = AcceptTrip();

  const handleTrip = (tripID, pickupAddress, dropoffAddress) => {
    acceptTrip(tripID, pickupAddress, dropoffAddress, fetchTrips);
  };

  return (
    <main>
      <div>
        <h2>Active Trips</h2>
        <ul>
          {trips.length > 0 ? (
            trips.map(trip => (
              <li key={trip.tripID}>
                <div>Pickup Address: {trip.pickupAddress}</div>
                <div>Destination: {trip.dropoffAddress}</div>
                <button onClick={() => handleTrip(trip.tripID, trip.pickupAddress, trip.dropoffAddress)}>Accept Trip</button>
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
