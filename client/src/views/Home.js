import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";

import Hero from "../components/Hero";
import RestaurantCard from "../components/RestaurantCard";
import HeroImage from "../assets/homepage_hero.png";

const Home = ({ restaurants }) => {
  return (
    <>
      <Hero
        title="Order food to your door with us!"
        description="Let us take the strain off cooking for yourself or your family."
        image={HeroImage}
      />
      <Container className="section">
        <Row xs={1} md={2} lg={4} className="g-4">
          {restaurants.map((restaurant, id) => {
            return <RestaurantCard restaurant={restaurant} key={id} />;
          })}
        </Row>
      </Container>
    </>
  );
};

export default Home;
