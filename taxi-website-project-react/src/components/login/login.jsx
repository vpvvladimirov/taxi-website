import './login.css';
import { useState } from 'react';
import axios from 'axios';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const [formData, setFormData] = useState({
    username: '',
    pwd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/login.php', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.success && data.token) {
          localStorage.setItem('authToken', data.token);
          setResponseMessage(<div className='response-message' style={{ color: "black" }}>Logged in successfully</div>);
        } else {
          setResponseMessage(<div className='response-message'>Invalid username or password</div>);
        }
      } else {
        console.log('Server error');
      }
    } catch (error) {
      console.log('Network error', error);
    }
  };

  return (
    <div className='login-form'>
      <div className='login-text'>Login</div>
      <form onSubmit={handleSubmit} id='login-form' method='post'>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name='username' onChange={handleChange} value={formData.username} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className='password-group'>
            <input id='password' type={showPassword ? 'text' : 'password'}
              name="pwd" onChange={handleChange} value={formData.pwd} required />
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
  )
}

export default LoginForm;