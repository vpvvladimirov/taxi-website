import './signup.css';
import React, { useState } from 'react';
import axios from 'axios';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [responseMessage, setResponseMessage] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    pwd: '',
    dateOfBirth: '',
    gender: '',
    profileType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      const email = value.toLowerCase();

      if (email.endsWith('vvtaxi.net')) {
        setSignupData({
          ...signupData,
          [name]: value,
          profileType: 'driver'
        });
      } else if (email === 'vladiv291@gmail.com') {
        setSignupData({
          ...signupData,
          [name]: value,
          profileType: 'admin'
        });
      } else {
        setSignupData({
          ...signupData,
          [name]: value,
          profileType: 'client'
        });
      }
    } else {
      setSignupData({
        ...signupData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.pwd) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/register.php', signupData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          window.location.href = '/login';
        } else {
          setResponseMessage(<div className='response-message'>Error creating user</div>);
        }
      } else {
        setResponseMessage(<div className='response-message'>Server error</div>);
      }
    } catch (error) {
      setResponseMessage(<div className='response-message'>Network error</div>);
    }
  };

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