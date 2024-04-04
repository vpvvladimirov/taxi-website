import './all-accounts.css';
import React, { useState } from 'react';
import GetAccounts from '../../api/get-accounts';
import DeleteUser from '../../api/delete-user';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AllAccounts = () => {
  const { users } = GetAccounts();
  const { handleDelete } = DeleteUser();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div id='all-accounts-container'>
      <h1 id='all-accounts-text'>All accounts</h1>
      <div id='search-bar'>
        <input
          type='text'
          id='search-account-input'
          placeholder='Search an account'
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      {filteredUsers.length > 0 && (
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
              {filteredUsers.map(user => (
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
      {filteredUsers.length === 0 && (
        <h3>No accounts found</h3>
      )}
    </div>
  );
};

export default AllAccounts;