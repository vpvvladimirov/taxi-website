import axios from "axios";
import React, { useState } from "react";
import Alert from '@mui/material/Alert';

const AcceptTrip = () => {
  const [responseMessage, setResponseMessage] = useState(null);
  const [waitingTime, setWaitingTime] = useState(5);
  const userID = sessionStorage.getItem('userID');

  const acceptTrip = (tripID, pickupAddress, dropoffAddress, waitingTime, fetchTrips) => {
    return axios.post(`http://localhost/taxi-website-project/taxi-website-php/accept_trip.php`, {
      userID,
      tripID,
      pickupAddress,
      dropoffAddress,
      waitingTime
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

  const handleWaitingTimeChange = (event) => {
    setWaitingTime(event.target.value);
  };

  return { acceptTrip, responseMessage, waitingTime, handleWaitingTimeChange };
};

export default AcceptTrip;