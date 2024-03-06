import axios from "axios";

const DeleteUser = () => {
  const deleteUser = (userID, fetchData) => {
    return axios.delete(`http://localhost/taxi-website-project/taxi-website-php/delete_user.php?userID=${userID}`)
      .then(() => {
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return { deleteUser };
};

export default DeleteUser;