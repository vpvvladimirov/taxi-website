import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/login.php', loginData, {
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

          window.location.href = '/home';
        } else {
          setResponseMessage(<Alert severity="error">Invalid username or password</Alert>);
        }
      } else {
        setResponseMessage(<Alert severity="error">Server error</Alert>);
      }
    } catch (error) {
      setResponseMessage(<Alert severity="error">Network error</Alert>);
    } finally {
      setLoading(false);
    }
  };

  return {
    showPassword,
    loginData,
    responseMessage,
    loading,
    togglePasswordVisibility,
    handleChange,
    handleSubmit
  };
};

export default Login;