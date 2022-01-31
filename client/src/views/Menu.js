import React from "react";
import { Container } from "react-bootstrap";

import Hero from "../components/Hero";

const Menu = ({ restaurants }) => {
  const restaurantId = window.location.pathname.split("/")[2];
  console.log(restaurantId);
  let restaurant = restaurants.filter((r) => r.id === restaurantId);

  return (
    <>
      <Hero
        title={restaurant[0].name}
        description="Check out our menu for takeaway orders, we deliver."
        image={restaurant[0].image}
      />
      <Container className="section"></Container>
    </>
  );
};

export default Menu;
