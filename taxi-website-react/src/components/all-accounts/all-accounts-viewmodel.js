import { useState, useEffect } from "react";
import axios from "axios";

const AllAccountsViewModel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost/taxi-website-project/taxi-website-php/all_accounts.php')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const deleteUser = (userID) => {
    axios.delete(`http://localhost/taxi-website-project/taxi-website-php/delete_user.php?userID=${userID}`)
      .then(() => {
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return { users, deleteUser };
};

export default AllAccountsViewModel;