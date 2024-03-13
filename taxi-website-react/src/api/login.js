import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [loginData, setLoginData] = useState({
    username: '',
    pwd: ''
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

    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/login.php', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        sessionStorage.setItem('userID', response.data.userID);
        sessionStorage.setItem('username', response.data.username);
        sessionStorage.setItem('profileType', response.data.profileType);
        window.location.href = '/home';
      } else {
        setResponseMessage(<div className='response-message'>Invalid username or password</div>);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return { showPassword, loginData, responseMessage, togglePasswordVisibility, handleChange, handleSubmit };
};

export default Login;