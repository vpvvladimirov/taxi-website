import { useCallback } from 'react';
import axios from 'axios';

const Logout = () => {
  const logout = useCallback(async () => {
    const profileType = sessionStorage.getItem('profileType');

    if (profileType === 'driver') {
      const userID = sessionStorage.getItem('userID');

      try {
        const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/logout.php', {
          userID,

          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          sessionStorage.clear();
          window.location.href = '/login';
        }
      } catch (error) {
        console.log('Network error', error);
      }
    } else {
      sessionStorage.clear();
      window.location.href = '/login';
    }
  }, []);

  return { logout };
};

export default Logout;