import { useState, useEffect } from "react";
import axios from "axios";

const TripsViewModel = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost/taxi-website-project/taxi-website-php/get_active_trips.php')
      .then(response => {
        setTrips(response.data);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });
  };

  const acceptTrip = (tripID) => {
    axios.post(`http://localhost/taxi-website-project/taxi-website-php/accept_trip.php?tripID=${tripID}`)
      .then(() => {
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return { trips, acceptTrip };
};

export default TripsViewModel;