import React from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import Hero from "../components/Hero";
import HeroImage from "../assets/addrestaurant_hero.png";

const AddRestaurant = () => {
  return (
    <>
      <Hero
        title="Add your Restaurant"
        description="Reach more customers and boost your business with us."
        image={HeroImage}
      />
      <Container className="section">
        <h4>Add restaurant</h4>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="e.g. Casa Pizzeria"
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control size="lg" type="text" placeholder="e.g. London" />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control size="lg" type="text" placeholder="e.g. italian" />
          </Form.Group>
          <br />
          <button className="btn-colour">Add</button>
        </Form>
      </Container>
    </>
  );
};

export default AddRestaurant;
