import { useState, useEffect } from "react";
import axios from "axios";

const FetchAwaitingTrips = () => {
  const [awaitingTrips, setAwaitingTrips] = useState([]);
  const userID = sessionStorage.getItem('userID');

  useEffect(() => {
    axios.post('http://localhost/taxi-website-project/taxi-website-php/get_awaiting_trips.php', {
      userID
    })
      .then(response => {
        setAwaitingTrips(response.data);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });
  }, [userID]);

  return { awaitingTrips };
};

export default FetchAwaitingTrips;
