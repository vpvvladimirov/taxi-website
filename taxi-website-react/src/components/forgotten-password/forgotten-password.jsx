import './forgotten-password.css';
import React from 'react';
import ChangePassword from '../../api/change-password';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';

const ForgottenPasswordForm = () => {
  const {
    showPassword,
    passwordsMatch,
    responseMessage,
    forgottenPasswordData,
    togglePasswordVisibility,
    handleChange,
    handleChangePassword,
  } = ChangePassword();

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
