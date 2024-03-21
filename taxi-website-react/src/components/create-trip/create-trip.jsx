import './create-trip.css';
import React from "react";
import OrderTaxi from "../../api/order-taxi";

const CreateTrip = () => {
  const { orderData, handleChange, handleSubmit } = OrderTaxi();

  return (
    <div id='create-trip-container'>
      <h1 id='create-trip-text'>Order Taxi</h1>
      <form onSubmit={handleSubmit} id='create-trip-form' method='post'>
        <div className="create-trip-form-group">
          <label className='create-trip-label' htmlFor="pickup-address">Pickup Location:</label>
          <input
            value={orderData.pickupAddress}
            onChange={handleChange}
            type="text"
            id="pickup-address"
            name="pickupAddress"
            className='create-trip-input'
          />
        </div>
        <div className="create-trip-form-group">
          <label className='create-trip-label' htmlFor="dropoff-address">Destination:</label>
          <input
            value={orderData.dropoffAddress}
            onChange={handleChange}
            type="text"
            id="dropoff-address"
            name="dropoffAddress"
            className='create-trip-input'
          />
        </div>
        <button id='create-trip-button' type="submit">Order Taxi</button>
      </form>
    </div>
  );
};

export default CreateTrip;