import './trips-history.css';
import React from "react";
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import FetchTripsHistory from '../../api/get-trips-history';

const TripsHistory = () => {
  const { tripsHistory } = FetchTripsHistory();

  return (
    <div id='trips-history-container'>
      <h1 id='trips-history-text'>Trips History</h1>
      <div id='trips-history-list'>
        <table id='trips-history-table'>
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Pickup Address</th>
              <th>Destination</th>
              <th>Client ID</th>
              <th>Driver ID</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Trip Date</th>
            </tr>
          </thead>
          <tbody>
            {tripsHistory.length > 0 && (
              tripsHistory.map(trip => (
                <tr key={trip.tripID}>
                  <td>{trip.tripID}</td>
                  <td>{trip.pickupAddress}</td>
                  <td>{trip.dropoffAddress}</td>
                  <td>{trip.clientID}</td>
                  <td>{trip.driverID}</td>
                  <td id='trip-rating-td'>
                    {trip.rating}
                    <Stack spacing={1}>
                      <Rating
                        value={parseFloat(trip.rating)}
                        precision={0.5}
                        size='large'
                        readOnly
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: 'white',
                          }
                        }}
                      />
                    </Stack>
                  </td>
                  <td id='trip-comment-td'>{trip.comment}</td>
                  <td>{trip.tripDateTime}</td>
                </tr>

              )))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TripsHistory;