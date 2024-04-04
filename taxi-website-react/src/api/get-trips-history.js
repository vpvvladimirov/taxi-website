import { useState, useEffect } from "react";
import axios from "axios";

const FetchTripsHistory = () => {
  const [tripsHistory, setTripsHistory] = useState([]);

  const fetchTripsHistory = () => {
    axios.post('http://localhost/taxi-website-project/taxi-website-php/get_trips_history.php', {
    })
      .then(response => {
        setTripsHistory(response.data.reverse());
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });
  };

  useEffect(() => {
    fetchTripsHistory();
    const interval = setInterval(fetchTripsHistory, 10000);
    return () => clearInterval(interval);
  }, []);

  return { tripsHistory };
};

export default FetchTripsHistory;