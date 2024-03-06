import { useState, useEffect } from 'react';

const IsDriver = () => {
  const [authenticatedDriver, setAuthenticatedDriver] = useState(false);

  useEffect(() => {
    const userID = sessionStorage.getItem('userID');
    const username = sessionStorage.getItem('username');
    const profileType = sessionStorage.getItem('profileType');

    if (userID && username && profileType && (profileType === 'driver' || profileType === 'admin')) {
      setAuthenticatedDriver(true);
    }
  }, []);

  return { authenticatedDriver };
};

export default IsDriver;
