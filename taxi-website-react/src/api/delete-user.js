import axios from "axios";

const DeleteUser = () => {
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

  return { deleteUser };
};

export default DeleteUser;