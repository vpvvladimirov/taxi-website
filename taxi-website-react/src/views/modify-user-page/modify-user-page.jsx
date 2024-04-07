import React from "react";
import Header from "../../components/header/header";
import ModifyUser from "../../components/modify-user/modify-user";
import Error404 from "../404-page/404-page";
import IsAdmin from "../../api/is-admin";

const ModifyUserPage = () => {
  const { authenticatedAdmin } = IsAdmin();

  return (
    authenticatedAdmin ? (
      <>
        <Header />
        <ModifyUser />
      </>
    ) : (
      <Error404 />
    )
  )
};

export default ModifyUserPage;