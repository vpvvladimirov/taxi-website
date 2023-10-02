import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../src/views/login-page/login-page';
import SignupPage from '../src/views/signup-page/signup-page';
import ForgottenPasswordPage from './views/forgotten-password-page/forgotten-password-page';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Navigate replace to="/login" />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/forgotten-password' element={<ForgottenPasswordPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;