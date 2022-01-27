import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import RestImg from "../assets/homepage_hero.png";

const RestaurantCard = ({ restaurant }) => {
  return (
    <Col>
      <Card>
        <Card.Img src={RestImg} />
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <div className="card-section">
            <Card.Text>{restaurant.type}</Card.Text>
            <Link to="/">
              <button className="btn-colour">View Menu</button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RestaurantCard;
