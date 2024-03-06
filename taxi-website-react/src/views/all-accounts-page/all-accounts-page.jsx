import React from "react";
import Header from "../../components/header/header";
import AllAccounts from "../../components/all-accounts/all-accounts";
import IsAdmin from "../../api/is-admin";
import HomePage from "../home-page/home-page";

const AllAccountsPage = () => {
  const { authenticatedAdmin } = IsAdmin();

  return (
    <>
      {authenticatedAdmin ? (
        <div>
          <Header />
          <AllAccounts />
        </div>
      ) : (
        <HomePage />
      )}
    </>
  );
}

export default AllAccountsPage;
