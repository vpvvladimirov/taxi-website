import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const SignupData = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [responseMessage, setResponseMessage] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    pwd: '',
    dateOfBirth: '',
    gender: '',
    profileType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      const email = value.toLowerCase();

      if (email.endsWith('vvtaxi.net')) {
        setSignupData({
          ...signupData,
          [name]: value,
          profileType: 'driver'
        });
      } else if (email === 'vladiv291@gmail.com') {
        setSignupData({
          ...signupData,
          [name]: value,
          profileType: 'admin'
        });
      } else {
        setSignupData({
          ...signupData,
          [name]: value,
          profileType: 'client'
        });
      }
    } else {
      setSignupData({
        ...signupData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedData = Object.fromEntries(
      Object.entries(signupData).map(([key, value]) => [key, value.trim()])
    );

    const isEmpty = Object.values(trimmedData).some(value => value === '');

    if (isEmpty) {
      setResponseMessage(<Alert severity='warning'>Please fill in all the fields</Alert>);
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(trimmedData.dateOfBirth);

    if (selectedDate >= currentDate) {
      setResponseMessage(<Alert severity='warning'>Please enter a valid date of birth</Alert>);
      return;
    }

    if (signupData.password !== signupData.pwd) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/register.php', signupData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          setResponseMessage(<Alert severity="success">Logged in successfully</Alert>);
          window.location.href = '/login';
        } else {
          setResponseMessage(<Alert severity="error">Error creating user</Alert>);
        }
      } else {
        setResponseMessage(<Alert severity="error">Server error</Alert>);
      }
    } catch (error) {
      setResponseMessage(<Alert severity="error">Network error</Alert>);
    }
  };

  return {
    signupData,
    showPassword,
    passwordsMatch,
    responseMessage,
    togglePasswordVisibility,
    handleChange,
    handleSubmit
  };
};

export default SignupData;