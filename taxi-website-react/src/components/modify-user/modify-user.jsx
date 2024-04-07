import './modify-user.css';
import React from "react";
import ModifyUserData from "../../api/modify-user-data";

const ModifyUser = () => {
  const {
    userData,
    handleChange,
    handleSubmit,
    responseMessage
  } = ModifyUserData();

  return (
    <main>
      <div id="modify-user-container">
        <form onSubmit={handleSubmit}>
          <div id='modify-user-form'>
            {userData && (
              <div id="modify-user-info">
                <h1 id="modify-user-info-text">User Information</h1>
                <ul id="modify-user-list">
                  {userData.profileType === 'driver' ? (
                    <li>
                      <label htmlFor='driver-id'>Driver ID:</label>
                      <input
                        type="text"
                        id='driver-id'
                        name="driverID"
                        value={userData.driverID}
                      />
                    </li>
                  ) : (
                    <li>
                      <label htmlFor='client-id'>Client ID:</label>
                      <input
                        type="text"
                        id='client-id'
                        name="clientID"
                        value={userData.clientID}
                        onChange={handleChange}
                      />
                    </li>
                  )}
                  <li>
                    <label htmlFor='username'>Username:</label>
                    <input
                      type="text"
                      id='username'
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor='email'>Email:</label>
                    <input
                      type="email"
                      id='email'
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor='first-name'>First Name:</label>
                    <input
                      type="text"
                      id='first-name'
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor='last-name'>Last Name:</label>
                    <input
                      type="text"
                      id='last-name'
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor='dob'>Date of Birth:</label>
                    <input
                      type="date"
                      id='dob'
                      name="dateOfBirth"
                      value={userData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor='gender'>Gender:</label>
                    <input
                      type="text"
                      id='gender'
                      name="gender"
                      value={userData.gender}
                      onChange={handleChange}
                    />
                  </li>
                </ul>
              </div>
            )}
            {userData && userData.profileType === "driver" && (
              <div id='modify-vehicle-info'>
                <h1 id="modify-vehicle-text">Vehicle Information</h1>
                <ul id="modify-vehicle-list">
                  <li>
                    <label htmlFor='license-plate'>License Plate:</label>
                    <input
                      type="text"
                      id='license-plate'
                      name="licensePlate"
                      value={userData.licensePlate}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor='brand'>Brand:</label>
                    <input
                      type="text"
                      id='brand'
                      name="brand"
                      value={userData.brand}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor='model'>Model:</label>
                    <input
                      type="text"
                      id='model'
                      name="model"
                      value={userData.model}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor='year'>Year:</label>
                    <input
                      type="text"
                      id='year'
                      name="year"
                      value={userData.year}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor='current-status'>Current Status:</label>
                    <input
                      type="text"
                      id='current-status'
                      name="currentStatus"
                      value={userData.currentStatus}
                      onChange={handleChange}
                    />
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div id='modify-user-button-group'>
            {responseMessage}
            <button type="submit">Submit</button>
            <button type="button" onClick={() => { window.location.href = '/all-accounts' }}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ModifyUser;