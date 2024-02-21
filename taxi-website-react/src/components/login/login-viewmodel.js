import { useState } from 'react';
import axios from 'axios';

const LoginFormViewModel = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/login.php', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          setResponseMessage({ type: 'success', message: 'Logged in successfully' });
          window.location.href = '/home';
        } else {
          setResponseMessage({ type: 'error', message: 'Error logging in' });
        }
      } else {
        console.log('Server error');
      }
    } catch (error) {
      console.log('Network error', error);
    }
  };

  return { showPassword, responseMessage, loginData, togglePasswordVisibility, handleChange, handleSubmit };
};

export default LoginFormViewModel;