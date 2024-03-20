import { useState, useEffect } from "react";
import axios from "axios";

const FetchUnratedTrips = () => {
  const [unratedTrips, setUnratedTrips] = useState([]);
  const userID = sessionStorage.getItem('userID');

  useEffect(() => {
    axios.post('http://localhost/taxi-website-project/taxi-website-php/get_unrated_trips.php', {
      userID: userID
    })
      .then(response => {
        setUnratedTrips(response.data);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });
  }, [userID]);

  return { unratedTrips };
};

export default FetchUnratedTrips;
