import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import RestImg from "../assets/homepage_hero.png";

const RestaurantCard = () => {
  return (
    <Col>
      <Card>
        <Card.Img src={RestImg} />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Link to="/">
            <button className="btn-colour">View Menu</button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RestaurantCard;
