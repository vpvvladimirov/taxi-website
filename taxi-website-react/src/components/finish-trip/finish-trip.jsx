import React from "react";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ReviewTrip from '../../api/review-trip';

const FinishTrip = () => {
  const { reviewData, ratingValue, handleChange, handleRatingChange, handleSubmit } = ReviewTrip();

  return (
    <div>
      <h1 id='finish-trip-text'>Finish Trip</h1>
      <form onSubmit={handleSubmit}>
        <h3>Rate the trip</h3>
        <Stack spacing={1}>
          <Rating name="size-large" value={ratingValue} onChange={handleRatingChange} defaultValue={0} precision={1} />
        </Stack>
        <label htmlFor='comment'>Leave a comment</label>
        <input type='text' name='comment' id='comment' value={reviewData.comment} onChange={handleChange} required />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default FinishTrip;