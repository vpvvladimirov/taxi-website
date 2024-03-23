import axios from "axios";
import React, { useState } from "react";
import Alert from '@mui/material/Alert';

const AcceptTrip = () => {
  const [responseMessage, setResponseMessage] = useState(null);
  const userID = sessionStorage.getItem('userID');

  const acceptTrip = (tripID, pickupAddress, dropoffAddress, fetchTrips) => {
    return axios.post(`http://localhost/taxi-website-project/taxi-website-php/accept_trip.php`, {
      userID,
      tripID,
      pickupAddress,
      dropoffAddress
    })
      .then(() => {
        fetchTrips();
        setResponseMessage(<Alert severity='success'>Trip accepted successfully</Alert>);
      })
      .catch(error => {
        setResponseMessage(<Alert severity='error'>Error accepting trip</Alert>);
        console.error(error);
      });
  };

  return { acceptTrip, responseMessage };
};

export default AcceptTrip;