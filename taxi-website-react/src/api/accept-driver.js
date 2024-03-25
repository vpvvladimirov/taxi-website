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
        console.error('Error accepting trip:', error);
      });
  };

  return { acceptDriver, responseMessage };
};

export default AcceptDriver;