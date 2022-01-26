import React from "react";
import { Container } from "react-bootstrap";
import HeroImage from "../assets/addrestaurant_hero.png";
import Hero from "../components/Hero";

const AddRestaurant = () => {
  return (
    <>
      <Hero
        title="Add your Restaurant"
        description="Reach more customers and boost your business with us."
        image={HeroImage}
      />
      <Container></Container>
    </>
  );
};

export default AddRestaurant;
