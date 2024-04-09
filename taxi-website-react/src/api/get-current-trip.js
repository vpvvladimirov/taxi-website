import { useState, useEffect } from "react";
import axios from "axios";

const FetchCurrentTrip = () => {
  const [currentTrip, setCurrentTrip] = useState([]);
  const userID = sessionStorage.getItem('userID');

  useEffect(() => {
    axios.post('http://localhost/taxi-website-project/taxi-website-php/get_current_trip.php', {
      userID: userID
    })
      .then(response => {
        setCurrentTrip(response.data);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });
  }, [userID]);

  return { currentTrip };
};

export default FetchCurrentTrip;