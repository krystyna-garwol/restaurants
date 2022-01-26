import React from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";

import Hero from "../components/Hero";
import RestaurantCard from "../components/RestaurantCard";
import HeroImage from "../assets/homepage_hero.png";

const Home = ({ token }) => {
  const test = () => {
    axios
      .get("http://localhost:8080", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Hero
        title="Order food to your door with us!"
        description="Let us take the strain off cooking for yourself or your family."
        image={HeroImage}
      />
      <Container className="section">
        <Row xs={1} md={3} lg={4} className="g-4">
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
        </Row>
        <button onClick={() => test()}>Call API</button>
      </Container>
    </>
  );
};

export default Home;
