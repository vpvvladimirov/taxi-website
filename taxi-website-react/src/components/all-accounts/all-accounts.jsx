import React from 'react';
import GetAccounts from '../../api/get-accounts';
import DeleteUser from '../../api/delete-user';
import { Link } from 'react-router-dom';
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
        <h1 id='all-accounts-text'>All accounts</h1>
        {users.length > 0 ? (
          <table id='all-accounts-table'>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Profile Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.userID}>
                  <td>{user.userID}</td>
                  <td>{user.username}</td>
                  <td>{user.profileType}</td>
                  <td>
                    <Link to={`/modify-user/${user.userID}`}>
                      <button id='modify-user-button'>Edit</button>
                    </Link>
                    <button id='delete-user-button' onClick={() => handleDelete(user.userID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users</p>
        )}
      </div>
    </main>
  );
};

export default AllAccounts;
