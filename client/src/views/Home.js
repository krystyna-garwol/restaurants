import React from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

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
    <Container>
      <h1>Hello to Home</h1>
      <button onClick={() => test()}>Call API</button>
    </Container>
  );
};

export default Home;
