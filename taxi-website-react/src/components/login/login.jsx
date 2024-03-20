import './login.css';
import React from 'react';
import Login from '../../api/login';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';

const LoginForm = () => {
  const {
    showPassword,
    loginData,
    responseMessage,
    togglePasswordVisibility,
    handleChange,
    handleSubmit
  } = Login();

  return (
    <main>
      <div id='login-container'>
        <div id='login-text'>Login</div>
        <form id='login-form' onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label className='login-label' htmlFor="username">Username</label>
            <input
              type="text"
              name='username'
              className='login-input'
              id='username'
              onChange={handleChange}
              value={loginData.username}
              required />
          </div>
          <div className="login-form-group">
            <label className='login-label' htmlFor="login-pwd">Password</label>
            <div className='login-password-group'>
              <input
                type={showPassword ? 'text' : 'password'}
                name="pwd"
                className='login-input'
                id='login-pwd'
                onChange={handleChange}
                value={loginData.pwd}
                required />
              <i className={`login-password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}>
                <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
              </i>
            </div>
          </div>
          <button id="login-button" type="submit">Login</button>
        </form>
        <a id='sign-up-link' href='/signup'>Don&apos;t have an account yet? Sign up</a>
        <a id='forgotten-password-link' href='/forgotten-password'>Forgot your password?</a>
        {responseMessage}
      </div>
    </main>
  )
}

export default LoginForm;