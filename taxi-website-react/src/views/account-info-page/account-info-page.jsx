import React from "react";
import Header from "../../components/header/header";
import AccountInfo from "../../components/account-info/account-info";
import IsAuthenticated from "../../api/is-authenticated";
import WelcomePage from "../welcome-page/welcome-page";

const AccountInfoPage = () => {
  const { authenticated } = IsAuthenticated();

  return (
    authenticated ? (
      <>
        <Header />
        <AccountInfo />
      </>
    ) : (
      <WelcomePage />
    )
  );
}

export default AccountInfoPage;