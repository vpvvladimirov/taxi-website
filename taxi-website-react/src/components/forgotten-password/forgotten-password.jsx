import './forgotten-password.css';
import React from 'react';
import ChangePassword from '../../api/change-password';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';

const ForgottenPasswordForm = () => {
  const {
    showPassword,
    responseMessage,
    forgottenPasswordData,
    togglePasswordVisibility,
    handleChange,
    handleChangePassword,
  } = ChangePassword();

  return (
    <main>
      <div id='change-password-container'>
        <form id='change-password-form' onSubmit={handleChangePassword}>
          <div id='change-password-text'>Change Password</div>
          <div className="change-password-form-group">
            <label className='change-password-label' htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id='username'
              className='change-password-input'
              onChange={handleChange}
              value={forgottenPasswordData.username}
              required />
          </div>
          <div className="change-password-form-group">
            <label className='change-password-label' htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id='email'
              className='change-password-input'
              onChange={handleChange}
              value={forgottenPasswordData.email}
              required />
          </div>
          <div className="change-password-form-group">
            <label className='change-password-label' htmlFor="password">New Password</label>
            <div className='password-group'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='change-password-input'
                name="newPassword"
                id='password'
                onChange={handleChange}
                value={forgottenPasswordData.newPassword}
                required />
              <i className={`forgotten-password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}>
                <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
              </i>
            </div>
          </div>
          <div className="change-password-form-group">
            <label className='change-password-label' htmlFor="confirm-password">Confirm New Password</label>
            <div className='password-group'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='change-password-input'
                name="confirmPassword"
                id='confirm-password'
                onChange={handleChange}
                value={forgottenPasswordData.confirmPassword}
                required />
              <i className={`forgotten-password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}>
                <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
              </i>
            </div>
          </div>
          <button id='change-password-btn' type="submit">Submit</button>
        </form>
        {responseMessage}
      </div>
    </main>
  );
};

export default ForgottenPasswordForm;