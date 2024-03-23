import React from "react";
import DriversLeaderBoardData from "../../api/drivers_leaderboard";

const DriversLeaderBoard = () => {
  const { drivers } = DriversLeaderBoardData();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Driver ID</th>
            <th>Name</th>
            <th>Trip Count</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr key={driver.driverID}>
              <td>{index + 1}.</td>
              <td>{driver.driverID}</td>
              <td>{driver.firstName} {driver.lastName}</td>
              <td>{driver.tripCount}</td>
              <td>{driver.averageRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriversLeaderBoard;
