import { useState, useEffect } from "react";
import axios from "axios";

const FetchClientTrips = () => {
  const [activeTrips, setActiveTrips] = useState([]);
  const userID = sessionStorage.getItem('userID');

  const fetchClientTrips = () => {
    axios.post('http://localhost/taxi-website-project/taxi-website-php/get_client_trips.php', {
      userID: userID
    })
      .then(response => {
        setActiveTrips(response.data);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });
  };

  useEffect(() => {
    fetchClientTrips();
    const interval = setInterval(fetchClientTrips, 3000);
    return () => clearInterval(interval);
  }, [userID]);

  return { activeTrips };
};

export default FetchClientTrips;