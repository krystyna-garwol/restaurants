import React from "react";
import { Container } from "react-bootstrap";

const Hero = ({ title, description, image }) => {
  return (
    <div
      className="jumbotron jumbotron-fluid background-image"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Container>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
      </Container>
    </div>
  );
};

export default Hero;
