import React from "react";
import AboutUsImage from '../../images/about-us-image.jpg';
import './about-us.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-text">
        <h1>About Us</h1>
        <p>
          Welcome to VVTaxi, where reliable transportation meets exceptional service. With a dedication to punctuality and customer satisfaction, we provide a premier taxi service to meet all your transportation needs. From quick trips around town to airport transfers and special events, we strive to make every journey with us comfortable, safe, and convenient.
        </p>
        <p>
          At VVTaxi, we recognize the importance of efficient and dependable transportation. Whether you&apos;re heading to a business meeting, catching a flight, or exploring the city, our professional drivers and well-maintained vehicles ensure a smooth and enjoyable ride. With a commitment to reliability and professionalism, we invite you to choose VVTaxi for your next journey and experience the highest standards of transportation excellence.
        </p>
      </div>
      <div className="about-us-image">
        <img
          src={AboutUsImage}
          alt="Company Image"
        />
      </div>
    </div>
  )
};

export default AboutUs;