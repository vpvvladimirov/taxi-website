import { useState } from "react";
import GetAccounts from "./get-accounts";

const SearchUser = () => {
  const { users } = GetAccounts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return { filteredUsers, handleSearchInputChange, searchQuery };
};

export default SearchUser;