import axios from "axios";

const AcceptTrip = () => {
  const userID = sessionStorage.getItem('userID');

  const acceptTrip = (tripID, pickupAddress, dropoffAddress, fetchTrips) => {
    return axios.post(`http://localhost/taxi-website-project/taxi-website-php/accept_trip.php`, { userID, tripID, pickupAddress, dropoffAddress })
      .then(() => {
        fetchTrips();
      })
      .catch(error => {
        console.error('Error accepting trip:', error);
      });
  };

  return { acceptTrip };
};

export default AcceptTrip;
