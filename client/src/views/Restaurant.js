import React from "react";
import { Container } from "react-bootstrap";

import Hero from "../components/Hero";

const Restaurant = ({ restaurants }) => {
  const restaurantId = window.location.pathname.split("/")[3];
  let restaurant = restaurants.filter((r) => r.id === restaurantId);

  return (
    <>
      <Hero
        title="Check out our menu"
        description="Check out our menu for takeaway orders, we deliver."
        image={restaurant[0].image}
      />
      <Container className="section"></Container>
    </>
  );
};

export default Restaurant;
