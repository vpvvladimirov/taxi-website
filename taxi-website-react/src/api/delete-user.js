import axios from "axios";
import GetAccounts from "./get-accounts";
import Alert from '@mui/material/Alert';
import React, { useState } from "react";

const DeleteUser = () => {
  const [responseMessage, setResponseMessage] = useState(null);
  const { fetchData } = GetAccounts();

  const deleteUser = (userID, fetchData) => {
    return new Promise((resolve, reject) => {
      const isConfirmed = window.confirm('Are you sure you want to delete this user?');
      if (isConfirmed) {
        axios.delete(`http://localhost/taxi-website-project/taxi-website-php/delete_user.php?userID=${userID}`)
          .then(() => {
            setResponseMessage(<Alert severity="success">User deleted successfully</Alert>);
            setTimeout(() => {
              setResponseMessage(null);
            }, 2500);
            fetchData();
            resolve();
          })
          .catch(error => {
            setResponseMessage(<Alert severity="error">Error deleting user</Alert>);
            setTimeout(() => {
              setResponseMessage(null);
            }, 2500);
            console.error('Error deleting user:', error);
            reject(error);
          });
      } else {
        resolve();
      }
    });
  };

  const handleDelete = (userID) => {
    deleteUser(userID, fetchData);
  };

  return { deleteUser, handleDelete, responseMessage };
};

export default DeleteUser;