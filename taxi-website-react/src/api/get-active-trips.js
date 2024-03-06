import { useState, useEffect } from "react";
import axios from "axios";

const FetchTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = () => {
    axios.get('http://localhost/taxi-website-project/taxi-website-php/get_active_trips.php')
      .then(response => {
        setTrips(response.data);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });
  };

  return { trips, fetchTrips };
};

export default FetchTrips;
