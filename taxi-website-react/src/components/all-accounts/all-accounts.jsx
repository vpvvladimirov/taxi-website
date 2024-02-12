import './all-accounts.css';
import React, { useState } from "react";
import axios from "axios";

const AllAccounts = () => {
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
        setAccountInfo(data.account);
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

  return (
    <main>
      <div className="all-accounts-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
          <button type="submit">Search</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {accountInfo && (
          <div className="account-info">
            <h2>Account Information</h2>
            <p>Username: {accountInfo.username}</p>
            <p>First Name: {accountInfo.firstName}</p>
            {/* Display other account information as needed */}
          </div>
        )}
      </div>
    </main>
  );
};

export default AllAccounts;
