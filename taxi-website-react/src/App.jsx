import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './views/home-page/home-page';
import LoginPage from '../src/views/login-page/login-page';
import SignupPage from '../src/views/signup-page/signup-page';
import ForgottenPasswordPage from './views/forgotten-password-page/forgotten-password-page';
import Error404 from './views/404-page/404-page';
import WelcomePage from './views/welcome-page/welcome-page';
import OrderTaxiPage from './views/order-taxi-page/order-taxi-page';
import AccountInfoPage from './views/account-info-page/account-info-page';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Navigate replace to="/home" />} />
          <Route path='/welcome' element={<WelcomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/forgotten-password' element={<ForgottenPasswordPage />} />
          <Route path='account-info' element={<AccountInfoPage />} />
          <Route path='/order-taxi' element={<OrderTaxiPage />} />
          <Route path="/error-404" element={<Error404 />} />
          <Route path='/*' element={<Navigate to="/error-404" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;