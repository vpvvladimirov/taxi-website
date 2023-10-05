import './login.css';
import { useState } from 'react';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='login-form'>
      <div className='login-text'>Login</div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email-field" required />
      </div>
      <div className="form-group">

        <label htmlFor="password">Password</label>
        <div className='password-group'>
          <input type={showPassword ? "text" : "password"} id="password" required />
          <i className={`password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}>
            <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
          </i>
        </div>
      </div>
      <button id='login-btn' type="submit">Login</button>
      <a className='sign-up-link' href='/signup'>Don&apos;t have an account? Sign up</a>
      <a className='forgotten-password' href='/forgotten-password'>Forgot your password?</a>
    </div>
  )
}

export default LoginForm;