import React from 'react';
import UseUserData from '../../api/use-user-data';
import './account-info.css';

const AccountInfo = () => {
  const { userData } = UseUserData();

  return (
    <main>
      <div className="account-info">
        <h2>User Information</h2>
        {userData ? (
          <div>
            {
              <div>
                <div><strong>Username:</strong> {userData.username}</div>
                <div><strong>Profile Type:</strong> {userData.profileType}</div>
                <div><strong>First Name:</strong> {userData.firstName}</div>
                <div><strong>Last Name:</strong> {userData.lastName}</div>
                <div><strong>Email:</strong> {userData.email}</div>
                <div><strong>Date of Birth:</strong> {userData.dateOfBirth}</div>
                <div><strong>Gender:</strong> {userData.gender}</div>
              </div>
            }
          </div>
        ) : (
          <div>No user information available</div>
        )}
        {userData && userData.profileType === 'driver' && (
          <div>
            <h3>Vehicle Information</h3>
            {
              <div>
                <div><strong>License Plate:</strong> {userData.licensePlate}</div>
                <div><strong>Model:</strong> {userData.model}</div>
                <div><strong>Year:</strong> {userData.year}</div>
                <div><strong>Current Status:</strong> {userData.currentStatus}</div>
              </div>
            }
          </div>
        )}
      </div>
    </main>
  );
};

export default AccountInfo;
