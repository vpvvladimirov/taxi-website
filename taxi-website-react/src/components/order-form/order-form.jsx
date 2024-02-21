import './order-form.css';
import OrderFormViewModel from './order-form-viewmodel';
import React from 'react';

const OrderForm = () => {
  const { orderData, handleChange, handleSubmit } = OrderFormViewModel();

  return (
    <div id="order-taxi-form-container">
      <form onSubmit={handleSubmit} id='signup-form' method='post'>
        <div className="form-group">
          <label htmlFor="pickupAddress">Pickup Location:</label>
          <input
            value={orderData.pickupAddress}
            onChange={handleChange}
            type="text"
            id="pickupAddress"
            name="pickupAddress"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropoffAddress">Destination:</label>
          <input
            value={orderData.dropoffAddress}
            onChange={handleChange}
            type="text"
            id="dropoffAddress"
            name="dropoffAddress"
          />
        </div>
        <button type="submit">
          Order Taxi
        </button>
      </form>
    </div>
  );
}

export default OrderForm;