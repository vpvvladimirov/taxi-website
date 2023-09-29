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
        <input type="email" id="email" required />
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
      <button type="submit">Login</button>
      <div className='sign-up-link'>
        Don&apos;t have an account? <a>Sign up</a>
      </div>
      <a className='forgotten-password'>Forgot your password?</a>
    </div>
  )
}

export default LoginForm;