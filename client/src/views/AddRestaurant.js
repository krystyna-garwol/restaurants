import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import Hero from "../components/Hero";
import HeroImage from "../assets/addrestaurant_hero.png";
import { addRestaurant } from "../utils/requests";

const AddRestaurant = ({ setRestaurants, token }) => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    type: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addRestaurant(formData, setRestaurants, token);
    setFormData({
      name: "",
      city: "",
      type: "",
    });
  };

  return (
    <>
      <Hero
        title="Add your Restaurant"
        description="Reach more customers and boost your business with us."
        image={HeroImage}
      />
      <Container className="section">
        <h4>Add restaurant</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              size="lg"
              type="text"
              placeholder="e.g. Casa Pizzeria"
              name="name"
              value={formData.name}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              onChange={handleChange}
              size="lg"
              type="text"
              placeholder="e.g. London"
              name="city"
              value={formData.city}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control
              onChange={handleChange}
              size="lg"
              type="text"
              placeholder="e.g. italian"
              name="type"
              value={formData.type}
            />
          </Form.Group>
          <br />
          <button type="submit" className="btn-colour">
            Add
          </button>
        </Form>
      </Container>
    </>
  );
};

export default AddRestaurant;
