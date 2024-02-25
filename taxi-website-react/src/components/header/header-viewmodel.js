import { useState, useEffect } from 'react';
import axios from 'axios';

const HeaderViewModel = () => {
  const [profileType, setProfileType] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost/taxi-website-project/taxi-website-php/get_profile_type.php', {
          withCredentials: true,
        });

        if (response.status === 200) {
          const data = response.data;
          if (data.success) {
            setProfileType(data.profileType);
          }
        }
      } catch (error) {
        console.log('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost/taxi-website-project/taxi-website-php/logout.php', {
        withCredentials: true,
      });

      if (response.status === 200) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.log('Error logging out', error);
    }
  };

  return { profileType, handleLogout };
};

export default HeaderViewModel;