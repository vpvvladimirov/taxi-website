import './forgotten-password.css';
import { useState } from 'react';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';

const ForgottenPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='login-form'>
      <div className='login-text'>Change Password</div>
      <div className="form-group">
        <label htmlFor="password">New Password</label>
        <input type="password" id="password" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Confirm New Password</label>
        <div className='password-group'>
          <input type={showPassword ? "text" : "password"} id="password" required />
          <i className={`password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}>
            <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
          </i>
        </div>
      </div>
      <button id='login-btn' type="submit">Submit</button>
    </div>
  )
}

export default ForgottenPasswordForm;