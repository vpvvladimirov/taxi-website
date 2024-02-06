import './order-taxi-page.css';
import React from 'react';
import Header from "../../components/header/header";
import MapComponent from "../../components/map/map";
import OrderForm from "../../components/order-form/order-form";

const OrderTaxiPage = () => {
  return (
    <>
      <Header />
      <div id='order-taxi-container-page'>
        <MapComponent />
        <OrderForm />
      </div>
    </>
  );
}

export default OrderTaxiPage;