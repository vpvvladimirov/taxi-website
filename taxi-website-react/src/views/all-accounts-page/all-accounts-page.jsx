import React from "react";
import Header from "../../components/header/header";
import AllAccounts from "../../components/all-accounts/all-accounts";
import IsAdmin from "../../api/is-admin";
import Error404 from "../404-page/404-page";

const AllAccountsPage = () => {
  const { authenticatedAdmin } = IsAdmin();

  return (
    authenticatedAdmin ? (
      <>
        <Header />
        <AllAccounts />
      </>
    ) : (
      <Error404 />
    )
  );
}

export default AllAccountsPage;
