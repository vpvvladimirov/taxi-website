import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [loginData, setLoginData] = useState({
    username: '',
    pwd: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation not supported'));
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let location = null;

      try {
        location = await getLocation();
      } catch (error) {
        setResponseMessage(<Alert severity="warning">Please enable location permission</Alert>);
        return;
      }

      const dataWithLocation = { ...loginData, location };

      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/login.php', dataWithLocation, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          setResponseMessage(<Alert severity="success">Logged in successfully</Alert>);

          const { userID, username, profileType } = response.data;

          sessionStorage.setItem('userID', userID);
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('profileType', profileType);
          sessionStorage.setItem('latitude', location.latitude);
          sessionStorage.setItem('longitude', location.longitude);

          window.location.href = '/home';
        } else {
          setResponseMessage(<Alert severity="error">Invalid username or password</Alert>);
        }
      } else {
        setResponseMessage(<Alert severity="error">Server error</Alert>);
      }
    } catch (error) {
      setResponseMessage(<Alert severity="error">Network error</Alert>);
    }
  };

  return {
    showPassword,
    loginData,
    responseMessage,
    togglePasswordVisibility,
    handleChange,
    handleSubmit
  };
};

export default Login;