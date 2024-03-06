import { useState, useEffect } from "react";
import axios from "axios";

const GetAccounts = () => {
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

  return { users, fetchData };
};

export default GetAccounts;
