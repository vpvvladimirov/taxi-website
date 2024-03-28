import './choose-driver.css';
import React from "react";
import AcceptDriver from "../../api/accept-driver";
import FetchClientTrips from '../../api/get-client-trips';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ChooseDriver = () => {
  const { handleDriver, responseMessage } = AcceptDriver();
  const { activeTrips } = FetchClientTrips();

  return (
    <div id='choose-driver-container'>
      <h1 id='accepted-trips-text'>Accepted Trips</h1>
      <div id='accepted-trips-list'>
        <table id='accepted-trips-table'>
          <thead>
            <tr>
              <th>Trip №</th>
              <th>Pickup Address</th>
              <th>Destination</th>
              <th>Driver</th>
              <th>Trip Count</th>
              <th>Driver Rating</th>
              <th>Waiting Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activeTrips.map(trip => (
              <tr key={trip.activeTripID}>
                <td>{trip.tripID}</td>
                <td>{trip.pickupAddress}</td>
                <td>{trip.dropoffAddress}</td>
                <td>{trip.firstName} {trip.lastName} | {trip.driverID}</td>
                <td>{trip.tripCount}</td>
                <td>
                  <Stack spacing={1}>
                    <Rating value={parseFloat(trip.averageRating)} precision={0.5} readOnly />
                  </Stack>
                </td>
                <td>~ {trip.waitingTime} minutes</td>
                <td>
                  <button id='accept-driver-button' onClick={() => handleDriver(trip.tripID, trip.driverID)}>Accept Driver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {responseMessage}
    </div>
  );
};

export default ChooseDriver;