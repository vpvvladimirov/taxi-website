import React from "react";
import IsAdmin from "../../api/is-admin";
import TripsHistory from "../../components/trips-history/trips-history";
import Header from "../../components/header/header";
import Error404 from "../404-page/404-page";

const TripsHistoryPage = () => {
  const { authenticatedAdmin } = IsAdmin();

  return (
    authenticatedAdmin ? (
      <>
        <Header />
        <TripsHistory />
      </>
    ) : (
      <Error404 />
    )
  );
};

export default TripsHistoryPage;