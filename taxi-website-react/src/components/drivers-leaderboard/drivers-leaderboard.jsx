import './drivers-leaderboard.css';
import React from "react";
import DriversLeaderBoardData from "../../api/drivers-leaderboard";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const DriversLeaderBoard = () => {
  const { drivers } = DriversLeaderBoardData();

  return (
    <div id='drivers-leaderboard-container'>
      <table id='drivers-leaderboard-table'>
        <caption><strong>Drivers Leaderboard</strong></caption>
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
              <td id='position-td'>{index + 1}.</td>
              <td>{driver.driverID}</td>
              <td>{driver.firstName} {driver.lastName}</td>
              <td>{driver.tripCount}</td>
              <td id='rating-td'>
                {driver.averageRating}
                <Stack spacing={1}>
                  <Rating
                    value={parseFloat(driver.averageRating)}
                    precision={0.5}
                    size='large'
                    readOnly
                    sx={{
                      '& .MuiRating-iconEmpty': {
                        color: 'white',
                      },
                    }}
                  />
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriversLeaderBoard;
