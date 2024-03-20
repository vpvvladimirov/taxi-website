import './signup.css';
import React from 'react';
import SignupData from '../../api/signup-data';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';

const Signup = () => {
  const {
    signupData,
    showPassword, passwordsMatch,
    responseMessage,
    togglePasswordVisibility,
    handleChange,
    handleSubmit
  } = SignupData();

  return (
    <main>
      <div id='signup-container'>
        <div id='signup-text'>Create An Account</div>
        <form id='signup-form' onSubmit={handleSubmit}>
          <div id='signup-content-row'>
            <div className='signup-column'>
              <div className="signup-form-group">
                <label className='signup-label' htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  name='firstName'
                  className='signup-input'
                  id='first-name'
                  value={signupData.firstName}
                  onChange={handleChange}
                  required />
              </div>
              <div className="signup-form-group">
                <label className='signup-label' htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  name='lastName'
                  className='signup-input'
                  id='last-name'
                  value={signupData.lastName}
                  onChange={handleChange}
                  required />
              </div>
              <div className="signup-form-group">
                <label className='signup-label' htmlFor="username">Username</label>
                <input
                  type="text"
                  name='username'
                  className='signup-input'
                  id='username'
                  value={signupData.username}
                  onChange={handleChange}
                  required />
              </div>
              <div className="signup-form-group">
                <label className='signup-label' htmlFor="email">Email</label>
                <input
                  type="email"
                  name='email'
                  className='signup-input'
                  id='email'
                  value={signupData.email}
                  onChange={handleChange}
                  required />
              </div>
            </div>
            <div className='signup-column'>
              <div className="signup-form-group">
                <label className='signup-label' htmlFor="signup-password">Password</label>
                <div className='signup-password-group'>
                  <input
                    type={showPassword ? "text" : "password"}
                    name='password'
                    className='signup-input'
                    id='signup-password'
                    value={signupData.password}
                    onChange={handleChange}
                    required />
                  <i className={`password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={() => togglePasswordVisibility()}>
                    <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
                  </i>
                </div>
              </div>
              <div className="signup-form-group">
                <label className='signup-label' htmlFor="signup-pwd">Confirm Password</label>
                <div className='signup-password-group'>
                  <input
                    type={showPassword ? "text" : "password"}
                    name='pwd'
                    className='signup-input'
                    id='signup-pwd'
                    value={signupData.pwd}
                    onChange={handleChange}
                    required />
                  <i className={`password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}>
                    <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
                  </i>
                </div>
              </div>
              <div className="signup-form-group">
                <label className='signup-label' htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  name='dateOfBirth'
                  className='signup-input'
                  id='dob'
                  value={signupData.dateOfBirth}
                  onChange={handleChange}
                  required />
              </div>
              <div className="signup-form-group">
                <label className='signup-label' htmlFor="gender">Gender</label>
                <select
                  name='gender'
                  className='signup-input'
                  id='gender'
                  value={signupData.gender}
                  onChange={handleChange}
                  required>
                  <option value=""></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <button id="signup-button" type="submit">Sign Up</button>
          <a id='log-in-link' href='/login'>Already have an account? Log in</a>
          {!passwordsMatch && <div className="response-message">Passwords don&apos;t match</div>}
          {responseMessage}
        </form >
      </div >
    </main>
  );
};

export default Signup;