import './order-form.css';
import React from 'react';

const OrderForm = () => {
  return (
    <>
      <div id='order-taxi-form-container'>
        <div className="form-group">
          <label htmlFor="pickupLocation">Pickup Location:</label>
          <input type="text" id="pickupLocation" name="pickupLocation" />
        </div>
        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <input type="text" id="destination" name="destination" />
        </div>
        <button type="button">
          Order Taxi
        </button>
      </div>
    </>
  );
};

export default OrderForm;