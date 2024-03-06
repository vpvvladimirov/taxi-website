import React from 'react';
import SignupData from '../../api/signup-data';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';
import './signup.css';

const Signup = () => {
  const { signupData, showPassword, passwordsMatch, responseMessage, togglePasswordVisibility, handleChange, handleSubmit } = SignupData();

  return (
    <main>
      <div className='signup-form'>
        <div className='signup-text'>Create An Account</div>
        <form onSubmit={handleSubmit} id='signup-form' method='post'>
          <div className='content-row'>
            <div className='column'>
              <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="text" name='firstName' value={signupData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input type="text" name='lastName' value={signupData.lastName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name='username' value={signupData.username} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name='email' value={signupData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className='column'>
              <label htmlFor="password">Password</label>
              <div className='password-group'>
                <input type={showPassword ? "text" : "password"} name='password' value={signupData.password} onChange={handleChange} className="password-field" required />
                <i className={`password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={() => togglePasswordVisibility()}>
                  <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
                </i>
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className='password-group'>
                  <input type={showPassword ? "text" : "password"} name='pwd' value={signupData.pwd} onChange={handleChange} className="password-field" required />
                  <i className={`password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}>
                    <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
                  </i>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input type="date" name='dateOfBirth' value={signupData.dateOfBirth} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select name='gender' value={signupData.gender} onChange={handleChange} id="gender" required>
                  <option value=""></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value='attack-helicopter'>Attack Helicopter</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <button id="submit-button" type="submit">Sign Up</button>
          <a className='log-in-link' href='/login'>Already have an account? Log in</a>
          {!passwordsMatch && <div className="response-message">Passwords don&apos;t match</div>}
          {responseMessage}
        </form >
      </div >
    </main>
  );
};

export default Signup;