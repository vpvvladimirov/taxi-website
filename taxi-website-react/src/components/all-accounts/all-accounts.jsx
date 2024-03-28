import './all-accounts.css';
import React from 'react';
import GetAccounts from '../../api/get-accounts';
import DeleteUser from '../../api/delete-user';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AllAccounts = () => {
  const { users } = GetAccounts();
  const { handleDelete } = DeleteUser();

  return (
    <div id='all-accounts-container'>
      <h1 id='all-accounts-text'>All accounts</h1>
      {users.length > 0 && (
        <div id='all-accounts-list'>
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
                  <td id='action-cell'>
                    <Link id='modify-user-link' to={`/modify-user/${user.userID}`}>
                      <button id='modify-user-button'><EditIcon /></button>
                    </Link>
                    <button id='delete-user-button' onClick={() => handleDelete(user.userID)}><DeleteIcon /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllAccounts;
