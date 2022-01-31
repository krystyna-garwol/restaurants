import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const RestaurantCard = ({ restaurant }) => {
  return (
    <Col>
      <Card>
        <Card.Body>
          <div
            className="card-image"
            style={{
              backgroundImage: `url(${restaurant.image})`,
            }}
          ></div>
          <div className="card-section">
            <div>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text>{restaurant.type}</Card.Text>
            </div>
            <Link to={`/menu/${restaurant.id}`}>
              <button className="btn-colour">View Menu</button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RestaurantCard;
