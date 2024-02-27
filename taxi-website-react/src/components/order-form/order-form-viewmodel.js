import { useState, useEffect } from 'react';
import axios from 'axios';

const OrderFormViewModel = () => {
  const [userID, setUserID] = useState(null);

  const [orderData, setOrderData] = useState({
    pickupAddress: '',
    dropoffAddress: '',
    userID: '',
  });

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const response = await axios.get('http://localhost/taxi-website-project/taxi-website-php/get_user_data.php', {
          withCredentials: true,
        });
        if (response.status === 200) {
          const data = response.data;
          setUserID(data.userID);
        }
      } catch (error) {
        console.log('Error fetching user ID', error);
      }
    };

    fetchUserID();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataWithUserID = { ...orderData, userID };

    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/order_taxi.php', dataWithUserID, {
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

  return { userID, orderData, handleChange, handleSubmit };
};

export default OrderFormViewModel;
