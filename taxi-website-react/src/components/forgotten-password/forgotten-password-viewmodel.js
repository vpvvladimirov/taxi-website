import { useState } from 'react';
import axios from 'axios';

const ForgottenPasswordViewModel = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [responseMessage, setResponseMessage] = useState(null);
  const [forgottenPasswordData, setForgottenPasswordData] = useState({
    username: '',
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
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/change_password.php', forgottenPasswordData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          window.location.href = '/login';
        } else {
          setResponseMessage('Error changing password');
        }
      } else {
        setResponseMessage('Server error');
      }
    } catch (error) {
      setResponseMessage('Network error');
    }
  };

  return {
    showPassword,
    passwordsMatch,
    responseMessage,
    forgottenPasswordData,
    togglePasswordVisibility,
    handleChange,
    handleChangePassword
  };
};

export default ForgottenPasswordViewModel;
