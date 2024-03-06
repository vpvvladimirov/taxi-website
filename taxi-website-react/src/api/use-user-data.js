import { useState, useEffect } from 'react';
import axios from 'axios';

const UseUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
          setError(response.data.message);
        }
      } catch (error) {
        setError('An error occurred while fetching user information.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userData, loading, error };
};

export default UseUserData;
