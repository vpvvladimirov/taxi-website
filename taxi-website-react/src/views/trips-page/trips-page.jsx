import React from "react";
import Header from "../../components/header/header";
import Trips from "../../components/trips/trips";
import IsDriver from "../../api/is-driver";
import Error404 from "../404-page/404-page";

const TripsPage = () => {
  const { authenticatedDriver } = IsDriver();

  return (
    <>
      {authenticatedDriver ? (
        <div>
          <Header />
          <Trips />
        </div>
      ) : (
        <Error404 />
      )}
    </>
  );
}

export default TripsPage;