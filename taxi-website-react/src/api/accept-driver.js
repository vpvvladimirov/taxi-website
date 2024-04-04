import axios from "axios";
import Alert from '@mui/material/Alert';
import React, { useState } from "react";

const AcceptDriver = () => {
  const [responseMessage, setResponseMessage] = useState(null);

  const acceptDriver = (tripID, driverID) => {
    return axios.post(`http://localhost/taxi-website-project/taxi-website-php/accept_driver.php`, {
      tripID,
      driverID
    })
      .then(() => {
        setResponseMessage(<Alert severity="success">Driver {driverID} accepted successfully</Alert>);
        window.location.reload();
      })
      .catch(error => {
        setResponseMessage(<Alert severity="error">Error accepting driver {driverID}</Alert>);
        console.error('Error accepting trip:', error);
      });
  };

  const handleDriver = (tripID, driverID) => {
    acceptDriver(tripID, driverID);
  };

  return { acceptDriver, responseMessage, handleDriver };
};

export default AcceptDriver;