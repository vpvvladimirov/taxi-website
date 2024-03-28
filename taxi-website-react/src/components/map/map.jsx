import './map.css';
import React from 'react';

const MapComponent = () => {
  return (
    <div id='map-container'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23459.149971244835!2d23.302758908725558!3d42.69538284617858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856dd1517c85%3A0xffb5a61b370ddfaa!2sSofia%20Center%2C%20Sofia!5e0!3m2!1sen!2sbg!4v1710426493007!5m2!1sen!2sbg"
        width="850" height="700" frameBorder="0" loading='async' referrerPolicy="no-referrer-when-downgrade" />
    </div>
  );
};

export default MapComponent;