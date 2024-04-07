import { useState, useEffect } from "react";
import axios from "axios";

const GetAccounts = () => {
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    axios.get('http://localhost/taxi-website-project/taxi-website-php/get_all_accounts.php')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return { users, fetchData };
};

export default GetAccounts;
