import React from 'react';
import AllAccountsViewModel from './all-accounts-viewmodel';
import './all-accounts.css';

const AllAccounts = () => {
  const {
    searchUsername,
    setSearchUsername,
    accountInfo,
    errorMessage,
    handleSearch,
    handleModify,
    handleInputChange
  } = AllAccountsViewModel();

  return (
    <main>
      <div className='search-account-container'>
        <div className="search-container">
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
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {accountInfo && accountInfo.success && (
          <div className="all-info-container">
            <div className="account-info">
              <h2>Account Information</h2>
              <p>Username: <input type="text" name="username" value={accountInfo.username} onChange={handleInputChange} /></p>
              <p>Account Type: <input type="text" name="profileType" value={accountInfo.profileType} onChange={handleInputChange} /></p>
              {(accountInfo.profileType === 'client' || accountInfo.profileType === 'admin' || accountInfo.profileType === 'driver') && (
                <div className="account-info">
                  <p>First Name: <input type="text" name="firstName" value={accountInfo.clientInfo.firstName} onChange={handleInputChange} /></p>
                  <p>Last Name: <input type="text" name="lastName" value={accountInfo.clientInfo.lastName} onChange={handleInputChange} /></p>
                  <p>Email: <input type="email" name="email" value={accountInfo.clientInfo.email} onChange={handleInputChange} /></p>
                  <p>Date of Birth: <input type="date" name="dateOfBirth" value={accountInfo.clientInfo.dateOfBirth} onChange={handleInputChange} /></p>
                  <p>Gender: <input type="text" name="gender" value={accountInfo.clientInfo.gender} onChange={handleInputChange} /></p>
                </div>
              )}

            </div>
            {accountInfo.vehicleInfo && (
              <div className="account-info">
                <h2>Vehicle Information</h2>
                <p>License Plate: <input type="text" name="licensePlate" value={accountInfo.vehicleInfo.licensePlate} onChange={handleInputChange} /></p>
                <p>Model: <input type="text" name="model" value={accountInfo.vehicleInfo.model} onChange={handleInputChange} /></p>
                <p>Year: <input type="number" name="year" value={accountInfo.vehicleInfo.year} onChange={handleInputChange} /></p>
                <p>Current Status: <input type="text" name="currentStatus" value={accountInfo.vehicleInfo.currentStatus} onChange={handleInputChange} /></p>
              </div>
            )}
          </div>
        )}
        {accountInfo && accountInfo.success && (
          <button onClick={handleModify}>Modify Account</button>
        )}
      </div>
    </main>
  );
};

export default AllAccounts;
