import React from "react";
import Header from "../../components/header/header";
import Trips from "../../components/trips/trips";
import HomePageViewModel from "../home-page/home-page-viewmodel";
import WelcomePage from "../welcome-page/welcome-page";

const TripsPage = () => {
  const { authenticated } = HomePageViewModel();

  return (
    <>
      {authenticated ? (
        <div>
          <Header />
          <Trips />
        </div>
      ) : (
        <WelcomePage />
      )}
    </>
  );
}

export default TripsPage;