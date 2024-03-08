import { useState, useEffect } from "react";
import axios from "axios";

const FetchClientTrips = () => {
  const [trips, setTrips] = useState([]);
  const userID = sessionStorage.getItem('userID');

  useEffect(() => {
    axios.post('http://localhost/taxi-website-project/taxi-website-php/get_client_trips.php', {
      userID: userID
    })
      .then(response => {
        setTrips(response.data);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });
  }, [userID]);

  return { trips };
};

export default FetchClientTrips;
