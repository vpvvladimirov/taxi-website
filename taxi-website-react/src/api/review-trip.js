import axios from "axios";
import React, { useState } from "react";
import Alert from '@mui/material/Alert';

const ReviewTrip = () => {
  const [responseMessage, setResponseMessage] = useState(null);
  const [remainingChars, setRemainingChars] = useState(maxLength);
  const maxLength = 255;
  const [reviewData, setReviewData] = useState({
    comment: '',
  });
  const userID = sessionStorage.getItem('userID');
  const [rating, setRating] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value
    });
  };

  const handleRatingChange = (e, newValue) => {
    setRating(newValue);
    console.log("Rating value:", newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const allData = {
        ...reviewData,
        rating: rating,
        userID: userID
      };

      await axios.post('http://localhost/taxi-website-project/taxi-website-php/review_trip.php', allData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setResponseMessage(<Alert severity="success">Review sent successfully</Alert>);
      window.location.reload();

    } catch {
      console.error("There was an error");
    }
  };

  const handleTextareaChange = (event) => {
    const remaining = maxLength - event.target.value.length;
    setRemainingChars(remaining);
    handleChange(event);
  };

  return {
    reviewData,
    rating,
    responseMessage,
    remainingChars,
    maxLength,
    handleChange,
    handleRatingChange,
    handleSubmit,
    handleTextareaChange
  };
};

export default ReviewTrip;