import { useState } from 'react';
import axios from 'axios';

const AllAccountsViewModel = () => {
  const [searchUsername, setSearchUsername] = useState("");
  const [accountInfo, setAccountInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost/taxi-website-project/taxi-website-php/search_account.php?username=${searchUsername}`
      );
      const data = response.data;
      if (data.success) {
        setAccountInfo(data);
        setErrorMessage("");
      } else {
        setAccountInfo(null);
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error searching account:", error);
      setErrorMessage("Error searching account");
    }
  };

  const handleModify = async () => {
    // Implement functionality to modify account data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    searchUsername,
    setSearchUsername,
    accountInfo,
    errorMessage,
    handleSearch,
    handleModify,
    handleInputChange
  };
};

export default AllAccountsViewModel;
