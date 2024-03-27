import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';

const ModifyUserData = () => {
  const [responseMessage, setResponseMessage] = useState(null);
  const [userData, setUserData] = useState(null);
  const { userID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/modify_user_data.php', {
          userID: userID
        });
        if (response.data.success) {
          setUserData(response.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching user information.');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/modify_user.php', userData);
      if (response.data.success) {
        setResponseMessage(<Alert severity="success">User data updated successfully</Alert>);
      } else {
        setResponseMessage(<Alert severity="error">Error updating user data</Alert>);
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('An error occurred while updating user information.');
    }
  };

  const cancelModify = () => {
    window.location.href = '/all-accounts';
  }

  return {
    userData,
    handleChange,
    handleSubmit,
    cancelModify,
    responseMessage
  };
};

export default ModifyUserData;