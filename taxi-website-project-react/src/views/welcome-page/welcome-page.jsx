import './welcome-page.css';
import Background from '../../components/background/background';

const WelcomePage = () => {
  return (
    <>
      <Background />
      <div id='join-container'>
        <p id='join-p'>JOIN THE BIGGEST<br /> TAXI COMMUNITY<br /> IN BULGARIA!</p>
        <a id='join-link' href='/login'>JOIN NOW</a>
      </div >
    </>
  );
};

export default WelcomePage;