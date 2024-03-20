import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [forgottenPasswordData, setForgottenPasswordData] = useState({
    username: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForgottenPasswordData({
      ...forgottenPasswordData,
      [name]: value,
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (forgottenPasswordData.newPassword !== forgottenPasswordData.confirmPassword) {
      setResponseMessage(<Alert severity="warning">Passwords don&apos;t match</Alert>);
      return;
    }

    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/change_password.php', forgottenPasswordData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          setResponseMessage(<Alert severity="success">Password changed successfully</Alert>);
          window.location.href = '/login';
        } else {
          setResponseMessage(<Alert severity="error">Invalid username or email</Alert>);
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
    responseMessage,
    forgottenPasswordData,
    togglePasswordVisibility,
    handleChange,
    handleChangePassword
  };
};

export default ChangePassword;
