import axios from 'axios';
import './order-form.css';
import React, { useState } from 'react';

const OrderForm = () => {
  const [orderData, setOrderData] = useState({
    pickupAddress: '',
    dropoffAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/order_taxi.php', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          window.location.href = '/home';
        }
      }
    } catch (error) {
      console.log('Network error', error);
    }
  }

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