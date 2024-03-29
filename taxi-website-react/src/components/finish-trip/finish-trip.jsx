import './finish-trip.css';
import React from "react";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ReviewTrip from '../../api/review-trip';

const FinishTrip = () => {
  const {
    reviewData,
    rating,
    responseMessage,
    remainingChars,
    maxLength,
    handleTextareaChange,
    handleRatingChange,
    handleSubmit
  } = ReviewTrip();

  return (
    <div id='finish-trip-container'>
      <h1 id='finish-trip-text'>Finish Trip</h1>
      <form id='finish-trip-form' onSubmit={handleSubmit}>
        <div className="finish-trip-form-group">
          <label className='finish-trip-label' id='rate-trip-text'>Rate the trip</label>
          <Stack spacing={1}>
            <Rating
              name="size-large"
              value={rating}
              onChange={handleRatingChange}
              defaultValue={0}
              precision={1}
              sx={{ fontSize: '50px' }} />
          </Stack>
        </div>
        <div className="finish-trip-form-group">
          <label className='finish-trip-label' htmlFor='comment'>Leave a comment</label>
          {reviewData.comment && (
            <h4 id='remaining-chars'>{remainingChars} characters remaining</h4>
          )}
          <textarea
            maxLength={maxLength}
            name='comment'
            id='comment'
            className='finish-trip-input'
            value={reviewData.comment}
            onChange={handleTextareaChange}
            required />
        </div>
        <button id='finish-trip-button' type='submit'>Submit</button>
      </form>
      {responseMessage}
    </div>
  );
};

export default FinishTrip;