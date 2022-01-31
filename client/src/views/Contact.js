import React from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import Hero from "../components/Hero";
import HeroImage from "../assets/contact_hero.jpg";

const Contact = () => {
  return (
    <>
      <Hero
        title="Contact Us"
        description="Get in touch if you have any questions or concerns."
        image={HeroImage}
      />
      <Container className="section">
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="email" placeholder="your name" />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="your email address" />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Let us know what you think</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <br />
          <button type="submit" className="btn-colour">
            Submit
          </button>
        </Form>
      </Container>
    </>
  );
};

export default Contact;
