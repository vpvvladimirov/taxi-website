import './signup.css';
import { useState } from 'react';
import hidePasswordIcon from '../../images/hide-password-icon.png';
import showPasswordIcon from '../../images/show-password-icon.png';

const Signup = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [responseMessage, setResponseMessage] = useState(null);

  const togglePasswordVisibility = (field) => {
    if (field === 1) {
      setShowPassword1(!showPassword1);
    } else {
      setShowPassword2(!showPassword2);
    }
  };

  let [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    const response = await fetch('api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      window.location.href = '/login';
    } else {
      setResponseMessage(<div className='response-message'>Error creating user</div>)
    }
  }

  return (
    <div className='signup-form'>
      <div className='signup-text'>Create An Account</div>
      <form onSubmit={handleSubmit} id='signup-form'>
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
              <label htmlFor="password">Password</label>
              <div className='password-group'>
                <input type={showPassword1 ? "text" : "password"} name='password' value={formData.password} onChange={handleChange} className="password-field" required />
                <i className={`password-toggle ${showPassword1 ? 'visible' : 'hidden'}`} onClick={() => togglePasswordVisibility(1)}>
                  <img src={showPassword1 ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
                </i>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <div className='password-group'>
                <input type={showPassword2 ? "text" : "password"} name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} className="password-field" required />
                <i className={`password-toggle ${showPassword2 ? 'visible' : 'hidden'}`} onClick={() => togglePasswordVisibility(2)}>
                  <img src={showPassword2 ? hidePasswordIcon : showPasswordIcon} alt="Toggle Password" />
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
        {!passwordsMatch && <div className="error-message">Passwords don&apos;t match</div>}
        {responseMessage}
      </form>
    </div>
  );
};

export default Signup;