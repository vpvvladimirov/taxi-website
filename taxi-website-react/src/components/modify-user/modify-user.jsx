import React from "react";
import ModifyUserData from "../../api/modify-user-data";

const ModifyUser = () => {
  const { userData, handleChange, handleSubmit } = ModifyUserData();

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div id="account-info">
          <div>
            <h1 id="user-info-text">User Information</h1>
            {userData ? (
              <>
                <ul id="user-info-list">
                  <li>
                    <strong>Username:</strong>{" "}
                    <input
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <strong>Email:</strong>{" "}
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <strong>First Name:</strong>{" "}
                    <input
                      type="text"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <strong>Last Name:</strong>{" "}
                    <input
                      type="text"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <strong>Date of Birth:</strong>{" "}
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={userData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <strong>Gender:</strong>{" "}
                    <input
                      type="text"
                      name="gender"
                      value={userData.gender}
                      onChange={handleChange}
                    />
                  </li>
                </ul>
              </>
            ) : (
              <div>No user information available</div>
            )}
          </div>
          <div>
            {userData && userData.profileType === "driver" && (
              <>
                <h1 id="vehicle-info-text">Vehicle Information</h1>
                <ul id="vehicle-info-list">
                  <li>
                    <strong>License Plate:</strong>{" "}
                    <input
                      type="text"
                      name="licensePlate"
                      value={userData.licensePlate}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <strong>Brand:</strong>{" "}
                    <input
                      type="text"
                      name="brand"
                      value={userData.brand}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <strong>Model:</strong>{" "}
                    <input
                      type="text"
                      name="model"
                      value={userData.model}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <strong>Year:</strong>{" "}
                    <input
                      type="text"
                      name="year"
                      value={userData.year}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <strong>Current Status:</strong>{" "}
                    <input
                      type="text"
                      name="currentStatus"
                      value={userData.currentStatus}
                      onChange={handleChange}
                    />
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default ModifyUser;