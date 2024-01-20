import './home-page.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../../components/header/header';
import WelcomePage from '../welcome-page/welcome-page';

const HomePage = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost/taxi-website-project/taxi-website-php/get-user-data.php', {
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

  return (
    <>
      {authenticated ? (
        <div>
          <Header />
        </div>
      ) : (
        <WelcomePage />
      )}
    </>
  );
};

export default HomePage;