import './welcome-page.css';
import React from 'react';
import Background from '../../components/background/background';
import IsAuthenticated from '../../api/is-authenticated';

const WelcomePage = () => {
  const { authenticated } = IsAuthenticated();
  const joinLink = authenticated ? '/home' : '/login';

  return (
    <>
      <Background />
      <div id='join-container'>
        <p id='join-p'>JOIN THE BIGGEST<br /> TAXI COMMUNITY<br /> IN BULGARIA!</p>
        <a id='join-link' href={joinLink}>JOIN NOW</a>
      </div>
    </>
  );
};

export default WelcomePage;
