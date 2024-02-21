import React, { useState } from 'react';
import axios from 'axios';

const SignupViewModel = () => {
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
          window.location.href = '/login';
        } else {
          setResponseMessage(<div className='response-message'>Error creating user</div>);
        }
      } else {
        setResponseMessage(<div className='response-message'>Server error</div>);
      }
    } catch (error) {
      setResponseMessage(<div className='response-message'>Network error</div>);
    }
  };

  return { signupData, showPassword, passwordsMatch, responseMessage, togglePasswordVisibility, handleChange, handleSubmit };
};

export default SignupViewModel;