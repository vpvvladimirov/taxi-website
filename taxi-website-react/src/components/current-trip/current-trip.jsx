import './current-trip.css';
import React, { useState, useEffect } from "react";
import FetchCurrentTrip from "../../api/get-current-trip";

const CurrentTrip = () => {
  const { currentTrip } = FetchCurrentTrip();
  const [dots, setDots] = useState("_");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots(prevDots => {
        if (prevDots === "_____________________") {
          return "_";
        } else {
          return prevDots + "_";
        }
      });
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="current-trip-container">
      <h1>Trip currently in progress...</h1>
      <div id="loader">
        <h1 id="dots">{dots}</h1>
        <svg width="105" height="40" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(2 1)" stroke="#002742" fill="yellow" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
            <path id="car__body" d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01" strokeWidth="3" />
            <ellipse strokeWidth="3.2" fill="black" cx="83.493" cy="30.25" rx="6.922" ry="6.808" />
            <ellipse strokeWidth="3.2" fill="black" cx="46.511" cy="30.25" rx="6.922" ry="6.808" />
            <path d="M22.5 16.5H2.475" strokeWidth="3" />
            <path d="M20.5 23.5H.4755" strokeWidth="3" />
            <path d="M25.5 9.5h-19" strokeWidth="3" />
          </g>
        </svg>
      </div>
      <h1>Trip Info</h1>
      <ul id='current-trip-list'>
        <li><strong>Pickup Address: </strong>{currentTrip.pickupAddress}</li>
        <li><strong>Destination: </strong>{currentTrip.dropoffAddress}</li>
        <li><strong>Client: </strong>{currentTrip.firstName} {currentTrip.lastName}</li>
      </ul>
    </div>
  );
};

export default CurrentTrip;