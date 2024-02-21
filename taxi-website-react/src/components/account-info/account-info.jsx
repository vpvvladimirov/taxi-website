import React from 'react';
import AccountInfoViewModel from './account-info-viewmodel';
import './account-info.css';

const AccountInfo = () => {
  const { userInfo, loading, error } = AccountInfoViewModel();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <div className="account-info">
        <h2>User Information</h2>
        <div>
          <strong>Username:</strong> {userInfo.username}
        </div>
        <div>
          <strong>Profile Type:</strong> {userInfo.profileType}
        </div>
        {userInfo.specificInfo && (
          <div>
            {Object.entries(userInfo.specificInfo).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </div>
        )}
        {userInfo.vehicleInfo && (
          <div>
            <h3>Vehicle Information</h3>
            {Object.entries(userInfo.vehicleInfo).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AccountInfo;
