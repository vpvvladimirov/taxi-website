import './choose-driver.css';
import React from "react";
import AcceptDriver from "../../api/accept-driver";
import FetchClientTrips from '../../api/get-client-trips';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ChooseDriver = () => {
  const { acceptDriver } = AcceptDriver();
  const { activeTrips } = FetchClientTrips();

  const handleDriver = (tripID, driverID) => {
    acceptDriver(tripID, driverID);
  };

  return (
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
              <th>Driver Trip Count</th>
              <th>Driver Rating</th>
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
                  <td>{trip.tripCount}</td>
                  <td>
                    <Stack spacing={1}>
                      <Rating value={trip.averageRating} precision={0.5} readOnly />
                    </Stack>
                  </td>
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
  );
};

export default ChooseDriver;