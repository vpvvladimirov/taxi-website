import React from 'react';
import AllAccountsViewModel from './all-accounts-viewmodel';
import './all-accounts.css';

const AllAccounts = () => {
  const { users, deleteUser } = AllAccountsViewModel();

  const handleDelete = (userID) => {
    deleteUser(userID);
  };

  return (
    <main>
      <div>
        <h2>All users</h2>
        <ul>
          {users.length > 0 ? (
            users.map(user => (
              <>
                <li key={user.userID}>
                  <div>User ID: {user.userID}</div>
                  <div>Username: {user.username}</div>
                  <div>Profile Type: {user.profileType}</div>
                </li>
                <button>Modify user</button>
                <button onClick={() => handleDelete(user.userID)}>Delete user</button>
              </>
            ))
          ) : (
            <li>No users</li>
          )}
        </ul>
      </div>
    </main>
  );
};

export default AllAccounts;
