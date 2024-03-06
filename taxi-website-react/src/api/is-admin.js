import { useState, useEffect } from 'react';

const IsAdmin = () => {
  const [authenticatedAdmin, setAuthenticatedAdmin] = useState(false);

  useEffect(() => {
    const userID = sessionStorage.getItem('userID');
    const username = sessionStorage.getItem('username');
    const profileType = sessionStorage.getItem('profileType');

    if (userID && username && profileType && profileType === 'admin') {
      setAuthenticatedAdmin(true);
    }
  }, []);

  return { authenticatedAdmin };
};

export default IsAdmin;
