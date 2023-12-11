import './signup.css';
import { useState } from 'react';
import axios from 'axios';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
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
        setFormData({
          ...formData,
          [name]: value,
          profileType: 'driver'
        });
      } else if (email === 'vladiv291@gmail.com') {
        setFormData({
          ...formData,
          [name]: value,
          profileType: 'admin'
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
          profileType: 'client'
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/register.php', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle the response here
      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          // Handle successful registration
          window.location.href = '/login';
        } else {
          // Handle registration error
          setResponseMessage(<div className='response-message'>Error creating user</div>);
        }
      } else {
        // Handle non-200 status code
        setResponseMessage(<div className='response-message'>Server error</div>);
      }
    } catch (error) {
      // Handle network error or any other Axios error
      setResponseMessage(<div className='response-message'>Network error</div>);
    }
  };

  return (
    <div className='signup-form'>
      <div className='signup-text'>Create An Account</div>
      <form onSubmit={handleSubmit} id='signup-form' method='post'>
        <div className='content-row'>
          <div className='column'>
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} id="first-name" required />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} id="last-name" required />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name='username' value={formData.username} onChange={handleChange} id="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name='email' value={formData.email} onChange={handleChange} id="email" required />
            </div>
          </div>
          <div className='column'>
            <div className="form-group">
              <label htmlFor="confirm-password">Password</label>
              <div className='password-group'>
                <input type={showPassword ? "text" : "password"} name='pwd' value={formData.pwd} onChange={handleChange} className="password-field" required />
                <i className={`password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}>
                  <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
                </i>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" name='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange} id="dob" required />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select name='gender' value={formData.gender} onChange={handleChange} id="gender" required>
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value='attack-helicopter'>Attack Helicopter</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit">Sign Up</button>
        <a className='log-in-link' href='/login'>Already have an account? Log in</a>
        {responseMessage}
      </form>
    </div>
  );
};

export default Signup;