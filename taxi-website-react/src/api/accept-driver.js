import axios from "axios";

const AcceptDriver = () => {
  const acceptDriver = (tripID, driverID) => {
    return axios.post(`http://localhost/taxi-website-project/taxi-website-php/accept_driver.php`, { tripID, driverID })
      .catch(error => {
        console.error('Error accepting trip:', error);
      });
  };

  return { acceptDriver };
};

export default AcceptDriver;