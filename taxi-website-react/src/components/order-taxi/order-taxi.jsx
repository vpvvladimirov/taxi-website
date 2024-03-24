import './order-taxi.css';
import React from 'react';

const OrderTaxi = () => {
  return (
    <div id="order-taxi-banner">
      <img id='order-taxi-image' src='https://media.drivingelectric.com/image/private/s--oXQeYz3s--/v1701345491/drivingelectric/2023-11/Renault%205%20teaser%204_fhio7b.jpg' alt='Order Taxi' />
      <div id='texts-container'>
        <h1 className='order-taxi-text' style={{ fontSize: '50px' }}>Ready to roll?</h1>
        <p className='order-taxi-text'>Experience the convenience of stress-free travel with our reliable taxi service.<br />
          Whether it&apos;s a quick ride to your destination or a planned trip,<br />
          we&apos;ve got you covered.<br />
          Your journey begins with a click —<br />
          order a taxi now and let us take you where you need to go,<br />
          comfortably and on time!<br />
        </p>
        <h1 className='order-taxi-text' style={{ fontSize: '42px' }}>↓ Order now! ↓</h1>
        <a href='/order-taxi' id='order-taxi-btn' className='order-taxi-text'>Order a taxi</a>
      </div>
    </div>
  );
};

export default OrderTaxi;