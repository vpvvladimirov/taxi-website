import { useState, useEffect } from 'react';
import axios from 'axios';

const UseUserData = () => {
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const userID = sessionStorage.getItem('userID');
      const username = sessionStorage.getItem('username');
      const profileType = sessionStorage.getItem('profileType');

      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/get_user_data.php', {
        userID,
        username,
        profileType
      });
      if (response.data.success) {
        setUserData(response.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('An error occurred while fetching user information.');
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return { userData };
};

export default UseUserData;
