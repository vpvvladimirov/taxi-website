import axios from "axios";
import { useState, useEffect } from "react";

const DriversLeaderBoardData = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost/taxi-website-project/taxi-website-php/drivers_leaderboard.php");
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  return { drivers };

};

export default DriversLeaderBoardData;