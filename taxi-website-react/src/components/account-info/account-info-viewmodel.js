import { useState, useEffect } from 'react';
import axios from 'axios';

const AccountInfoViewModel = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost/taxi-website-project/taxi-website-php/get_user_data.php', {
          withCredentials: true,
        });
        if (response.data.success) {
          setUserInfo(response.data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('An error occurred while fetching user information.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { userInfo, loading, error };
};

export default AccountInfoViewModel;
