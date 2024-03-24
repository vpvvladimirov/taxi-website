import axios from "axios";

const CancelTrip = () => {
  const userID = sessionStorage.getItem('userID');

  const cancelTrip = () => {
    return new Promise((resolve, reject) => {
      const isConfirmed = window.confirm('Are you sure you want to cancel your trip?');
      if (isConfirmed) {
        axios.post(`http://localhost/taxi-website-project/taxi-website-php/cancel_trip.php`, {
          userID
        })
          .then(() => {
            resolve();
          })
          .catch(error => {
            console.error('Error deleting user:', error);
            reject(error);
          });
      } else {
        resolve();
      }
    });
  };

  return { cancelTrip };
};

export default CancelTrip;