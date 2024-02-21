import { useState, useEffect } from 'react';
import axios from 'axios';

const HomePageViewModel = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost/taxi-website-project/taxi-website-php/get_user_data.php', {
          withCredentials: true,
        });

        if (response.data.success) {
          setAuthenticated(true);
        } else {
          window.location.href = '/welcome';
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, []);

  return { authenticated };
};

export default HomePageViewModel;