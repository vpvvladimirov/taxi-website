import React from 'react';
import GetAccounts from '../../api/get-accounts';
import DeleteUser from '../../api/delete-user';
import './all-accounts.css';

const AllAccounts = () => {
  const { users, fetchData } = GetAccounts();
  const { deleteUser } = DeleteUser();

  const handleDelete = (userID) => {
    deleteUser(userID, fetchData);
  };

  return (
    <main>
      <div>
        <h2>All users</h2>
        <ul>
          {users.length > 0 ? (
            users.map(user => (
              <li key={user.userID}>
                <div>User ID: {user.userID}</div>
                <div>Username: {user.username}</div>
                <div>Profile Type: {user.profileType}</div>
                <button>Modify user</button>
                <button onClick={() => handleDelete(user.userID)}>Delete user</button>
              </li>
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
