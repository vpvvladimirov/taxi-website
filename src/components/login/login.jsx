import './login.css';
export const Login = () => {
  return (
    <div className='login-form'>
      <div className='login-text'>Login</div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
      <a className='sign-up-link'>Don&apos;t have an account? Sign up</a>
      <a className='forgotten-password'>Forgot your password?</a>
    </div>
  )
}

export default Login;