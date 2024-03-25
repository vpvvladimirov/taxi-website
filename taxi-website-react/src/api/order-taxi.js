import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const OrderTaxi = () => {
  const [responseMessage, setResponseMessage] = useState(null);
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
          setResponseMessage(<Alert severity='success'>Taxi ordered successfully</Alert>);
          window.location.reload();
        }
      }
    } catch (error) {
      console.log('Network error', error);
    }
  };

  return { orderData, responseMessage, handleChange, handleSubmit };
};

export default OrderTaxi;
