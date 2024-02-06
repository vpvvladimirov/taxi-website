import './forgotten-password.css';
import React, { useState } from 'react';
import axios from 'axios';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';

const ForgottenPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [responseMessage, setResponseMessage] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const [forgottenPasswordData, setForgottenPasswordData] = useState({
    username: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForgottenPasswordData({
      ...forgottenPasswordData,
      [name]: value
    });
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (forgottenPasswordData.newPassword !== forgottenPasswordData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/change-password.php', forgottenPasswordData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          window.location.href = '/login';
        } else {
          setResponseMessage(<div className='response-message'>Error changing password</div>);
        }
      } else {
        setResponseMessage(<div className='response-message'>Server error</div>);
      }
    } catch (error) {
      setResponseMessage(<div className='response-message'>Network error</div>);
    }
  };

  return (
    <main>
      <div className='change-password-form'>
        <form onSubmit={handleChangePassword} id='change-password-form' method='post'>
          <div className='change-password-text'>Change Password</div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={handleChange} value={forgottenPasswordData.username} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <div className='password-group'>
              <input type={showPassword ? 'text' : 'password'} className="password-field" name="newPassword" onChange={handleChange} value={forgottenPasswordData.newPassword} required />
              <i className={`password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}>
                <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
              </i>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <div className='password-group'>
              <input type={showPassword ? 'text' : 'password'} className="password-field" name="confirmPassword" onChange={handleChange} value={forgottenPasswordData.confirmPassword} required />
              <i className={`password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}>
                <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
              </i>
            </div>
          </div>
          <button id='change-password-btn' type="submit">Submit</button>
          {!passwordsMatch && <div className="response-message">Passwords don&apos;t match</div>}
          {responseMessage}
        </form>
      </div>
    </main>
  )
}

export default ForgottenPasswordForm;
