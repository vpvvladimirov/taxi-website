import React from "react";
import Header from "../../components/header/header";
import Trips from "../../components/trips/trips";
import IsDriver from "../../api/is-driver";
import HomePage from "../home-page/home-page";

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
        <HomePage />
      )}
    </>
  );
}

export default TripsPage;