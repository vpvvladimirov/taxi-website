import { useState } from 'react';
import axios from 'axios';

const OrderTaxi = () => {
  const [orderData, setOrderData] = useState({
    pickupAddress: '',
    dropoffAddress: '',
    userID: sessionStorage.getItem('userID'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

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
  };

  return { orderData, handleChange, handleSubmit };
};

export default OrderTaxi;
