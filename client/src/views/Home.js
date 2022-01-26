import React from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Hero from "../components/Hero";
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
      <Container>
        <button onClick={() => test()}>Call API</button>
      </Container>
    </>
  );
};

export default Home;
