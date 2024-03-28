import axios from "axios";
import GetAccounts from "./get-accounts";

const DeleteUser = () => {
  const { fetchData } = GetAccounts();

  const deleteUser = (userID, fetchData) => {
    return new Promise((resolve, reject) => {
      const isConfirmed = window.confirm('Are you sure you want to delete this user?');
      if (isConfirmed) {
        axios.delete(`http://localhost/taxi-website-project/taxi-website-php/delete_user.php?userID=${userID}`)
          .then(() => {
            fetchData();
            resolve();
          })
          .catch(error => {
            console.error('Error deleting user:', error);
            reject(error);
          });
      } else {
        resolve();
      }
    });
  };

  const handleDelete = (userID) => {
    deleteUser(userID, fetchData);
  };

  return { deleteUser, handleDelete };
};

export default DeleteUser;