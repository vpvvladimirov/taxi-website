import './trips.css';
import React from "react";
import FetchTrips from "../../api/get-active-trips";
import AcceptTrip from "../../api/accept-trip";
import UseUserData from '../../api/use-user-data';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CurrentTrip from '../current-trip/current-trip';

const Trips = () => {
  const { trips, fetchTrips } = FetchTrips();
  const { acceptTrip, responseMessage, waitingTime, handleWaitingTimeChange } = AcceptTrip();
  const { userData } = UseUserData();

  return (
    <div id='trips-container'>
      {userData?.status === 'busy' ? (
        <CurrentTrip />
      ) : (
        trips.length > 0 ? (
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
                    <th>Waiting Time</th>
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
                        <select id='trip-minutes-select' value={waitingTime} onChange={handleWaitingTimeChange}>
                          <option value={2}>2 minutes</option>
                          <option value={5}>5 minutes</option>
                          <option value={10}>10 minutes</option>
                          <option value={15}>15 minutes</option>
                          <option value={20}>20 minutes</option>
                        </select>
                      </td>
                      <td>
                        <button id="accept-trip-button" onClick={() => acceptTrip(trip.tripID, trip.pickupAddress, trip.dropoffAddress, waitingTime, fetchTrips)}>
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
        )
      )}
    </div>
  );
};

export default Trips;