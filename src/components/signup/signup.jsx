import './signup.css';
import { useState } from 'react';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';

const Signup = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 1) {
      setShowPassword1(!showPassword1);
    } else {
      setShowPassword2(!showPassword2);
    }
  };

  return (
    <div className='signup-form'>
      <div className='signup-text'>Sign Up</div>
      <div className='content-row'>
        <div className='column'>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
        </div>
        <div className='column'>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className='password-group'>
              <input type={showPassword1 ? "text" : "password"} className="password-field" required />
              <i className={`password-toggle ${showPassword1 ? 'visible' : 'hidden'}`} onClick={() => togglePasswordVisibility(1)}>
                <img src={showPassword1 ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
              </i>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className='password-group'>
              <input type={showPassword2 ? "text" : "password"} className="password-field" required />
              <i className={`password-toggle ${showPassword2 ? 'visible' : 'hidden'}`} onClick={() => togglePasswordVisibility(2)}>
                <img src={showPassword2 ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
              </i>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" required />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" required>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value='attack-helicopter'>Attack Helicopter</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit">Sign Up</button>
    </div>
  );
};

export default Signup;