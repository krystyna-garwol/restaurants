import React from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import Hero from "../components/Hero";
import HeroImage from "../assets/booktable_hero.jpg";

const BookTable = ({ restaurants }) => {
  return (
    <>
      <Hero title="Book a Table" image={HeroImage} />
      <Container className="section">
        <Form>
          <Form.Group>
            <Form.Label>First Name &amp; Last Name</Form.Label>
            <Form.Control type="email" placeholder="your details" />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="your email address" />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Restaurant</Form.Label>
            <Form.Select>
              <option>Pick a Restaurant</option>
              {restaurants.map((restaurant) => {
                return (
                  <option key={restaurant.id} value={restaurant.name}>
                    {restaurant.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" />
          </Form.Group>
          <br />
          <button type="submit" className="btn-colour">
            Book
          </button>
        </Form>
      </Container>
    </>
  );
};

export default BookTable;
