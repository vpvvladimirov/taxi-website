import './trips.css';
import React from "react";
import FetchTrips from "../../api/get-active-trips";
import AcceptTrip from "../../api/accept-trip";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import UseUserData from '../../api/use-user-data';

const Trips = () => {
  const { trips, fetchTrips } = FetchTrips();
  const { acceptTrip, responseMessage } = AcceptTrip();
  const { userData } = UseUserData();

  const status = userData?.status;

  return (
    <div id='trips-container'>
      {status === 'busy' ? (
        <h1>Trip currently in progress...</h1>
      ) : (
        <>
          {trips.length > 0 ? (
            <div id='active-trips-container'>
              <h1 id="active-trips-text">Active Trips</h1>
              <div id='active-trips-list'>
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
              </div>
              {responseMessage}
            </div>
          ) : (
            <div id='awaiting-trips-container'>
              <h1>Waiting for available trips</h1>
              <Box>
                <CircularProgress />
              </Box>
            </div>
          )}
        </>)}

    </div>
  );
};

export default Trips;