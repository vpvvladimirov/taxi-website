import './forgotten-password.css';
import { useState } from 'react';
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

  const [formData, setFormData] = useState({
    username: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/change-password.php', formData, {
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
    <div className='change-password-form'>
      <form onSubmit={handleChangePassword} id='change-password-form' method='post'>
        <div className='change-password-text'>Change Password</div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" onChange={handleChange} value={formData.username} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <div className='password-group'>
            <input type={showPassword ? 'text' : 'password'} className="password-field" name="newPassword" onChange={handleChange} value={formData.newPassword} required />
            <i className={`password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}>
              <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
            </i>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm New Password</label>
          <div className='password-group'>
            <input type={showPassword ? 'text' : 'password'} className="password-field" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} required />
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
  )
}

export default ForgottenPasswordForm;
