import './login.css';
import React, { useState } from 'react';
import axios from 'axios';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const [loginData, setLoginData] = useState({
    username: '',
    pwd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  }

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
          setResponseMessage(<div className='response-message' style={{ color: "black" }}>Logged in successfully</div>);
          window.location.href = '/home';
        } else {
          setResponseMessage(<div className='response-message'>Error logging in</div>);
        }
      } else {
        console.log('Server error');
      }
    } catch (error) {
      console.log('Network error', error);
    }
  };

  return (
    <main>
      <div className='login-form'>
        <div className='login-text'>Login</div>
        <form onSubmit={handleSubmit} id='login-form' method='post'>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name='username' onChange={handleChange} value={loginData.username} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className='password-group'>
              <input id='password' type={showPassword ? 'text' : 'password'}
                name="pwd" onChange={handleChange} value={loginData.pwd} required />
              <i className={`password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}>
                <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
              </i>
            </div>
          </div>
          <button id="login-btn" type="submit">Login</button>
        </form>
        <a className='sign-up-link' href='/signup'>Don&apos;t have an account yet? Sign up</a>
        <a className='forgotten-password' href='/forgotten-password'>Forgot your password?</a>
        {responseMessage}
      </div>
    </main>
  )
}

export default LoginForm;
