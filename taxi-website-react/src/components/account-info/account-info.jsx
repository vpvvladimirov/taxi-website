import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './account-info.css';

const AccountInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost/taxi-website-project/taxi-website-php/get_user_data.php', {
          withCredentials: true,
        });
        if (response.data.success) {
          setUserInfo(response.data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('An error occurred while fetching user information.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

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
            <h3>Specific Information</h3>
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