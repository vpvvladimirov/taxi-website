import { useState, useEffect } from 'react';

const IsAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const userID = sessionStorage.getItem('userID');
    const username = sessionStorage.getItem('username');
    const profileType = sessionStorage.getItem('profileType');

    if (userID && username && profileType) {
      setAuthenticated(true);
    }
  }, []);

  return { authenticated };
};

export default IsAuthenticated;
