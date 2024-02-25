import React from 'react';
import AccountInfoViewModel from './account-info-viewmodel';
import './account-info.css';

const AccountInfo = () => {
  const { userInfo, loading, error } = AccountInfoViewModel();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      <div className="account-info">
        <h2>User Information</h2>
        {userInfo && (
          <div>
            {
              <div>
                <div><strong>Username:</strong> {userInfo.username}</div>
                <div><strong>Profile Type:</strong> {userInfo.profileType}</div>
                <div><strong>First Name:</strong> {userInfo.firstName}</div>
                <div><strong>Last Name:</strong> {userInfo.lastName}</div>
                <div><strong>Email:</strong> {userInfo.email}</div>
                <div><strong>Date of Birth:</strong> {userInfo.dateOfBirth}</div>
                <div><strong>Gender:</strong> {userInfo.gender}</div>
              </div>
            }
          </div>
        )}
        {userInfo && userInfo.profileType === 'driver' && (
          <div>
            <h3>Vehicle Information</h3>
            {
              <div>
                <div><strong>License Plate:</strong> {userInfo.licensePlate}</div>
                <div><strong>Model:</strong> {userInfo.model}</div>
                <div><strong>Year:</strong> {userInfo.year}</div>
                <div><strong>Current Status:</strong> {userInfo.currentStatus}</div>
              </div>
            }
          </div>
        )}
      </div>
    </main>
  );
};

export default AccountInfo;
