import React from 'react';
import UseUserData from '../../api/use-user-data';
import './account-info.css';

const AccountInfo = () => {
  const { userData } = UseUserData();

  return (
    <main>
      <div id="account-info">
        <div>
          <h1 id='user-info-text'>User Information</h1>
          {userData ? (
            <>
              {
                <ul id='user-info-list'>
                  <li><strong>Username:</strong> {userData.username}</li>
                  <li><strong>Email:</strong> {userData.email}</li>
                  <li><strong>Profile Type:</strong> {userData.profileType}</li>
                  <li><strong>First Name:</strong> {userData.firstName}</li>
                  <li><strong>Last Name:</strong> {userData.lastName}</li>
                  <li><strong>Date of Birth:</strong> {userData.dateOfBirth}</li>
                  <li><strong>Gender:</strong> {userData.gender}</li>
                </ul>
              }
            </>
          ) : (
            <div>No user information available</div>
          )}
        </div>
        <div>
          {userData && userData.profileType === 'driver' && (
            <>
              <h1 id='vehicle-info-text'>Vehicle Information</h1>
              {
                <ul id='vehicle-info-list'>
                  <li><strong>License Plate:</strong> {userData.licensePlate}</li>
                  <li><strong>Model:</strong> {userData.model}</li>
                  <li><strong>Year:</strong> {userData.year}</li>
                  <li><strong>Current Status:</strong> {userData.currentStatus}</li>
                </ul>
              }
            </>
          )}
        </div>
      </div>
    </main >
  );
};

export default AccountInfo;
