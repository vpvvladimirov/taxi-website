import './map.css';
import React from 'react';

const MapComponent = () => {
  return (
    <div id='map-container'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.3958681019544!2d23.361152376592738!3d42.69533791385305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa858c6033a3af%3A0x6aabc4f5f3bb9cd5!2sO.K.%20Supertrans!5e0!3m2!1sen!2sbg!4v1708503686230!5m2!1sen!2sbg"
        width="850" height="700" frameBorder="0" loading='async' referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
};

export default MapComponent;