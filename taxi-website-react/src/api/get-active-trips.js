import { useState, useEffect } from "react";
import axios from "axios";

const FetchTrips = () => {
  const [trips, setTrips] = useState([]);
  const userID = sessionStorage.getItem('userID');

  const fetchTrips = () => {
    axios.post('http://localhost/taxi-website-project/taxi-website-php/get_active_trips.php', {
      userID
    })
      .then(response => {
        setTrips(response.data);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });
  };

  useEffect(() => {
    fetchTrips();
    const interval = setInterval(fetchTrips, 3000);
    return () => clearInterval(interval);
  }, []);

  return { trips, fetchTrips };
};

export default FetchTrips;