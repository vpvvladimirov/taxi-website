import axios from "axios";
import { useState } from "react";

const ReviewTrip = () => {
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
    } catch {
      console.error("There was an error");
    }
  };

  return { reviewData, rating, handleChange, handleRatingChange, handleSubmit };
};

export default ReviewTrip;