import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ModifyUserData = () => {
  const [userData, setUserData] = useState(null);
  const { userID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/modify_user_data.php', {
          userID: userID
        });
        if (response.data.success) {
          setUserData(response.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching user information.');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/taxi-website-project/taxi-website-php/modify_user.php', userData);
      if (response.data.success) {
        console.log('User data updated successfully!');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('An error occurred while updating user information.');
    }
  };

  return { userData, handleChange, handleSubmit };
};

export default ModifyUserData;