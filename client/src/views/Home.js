import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Hero from "../components/Hero";
import RestaurantCard from "../components/RestaurantCard";
import HeroImage from "../assets/homepage_hero.png";

const Home = ({ restaurants, setRestaurants }) => {
  let allTypes = ["all", ...new Set(restaurants.map((r) => r.type))];
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  const filterRestaurants = (type) => {
    if (type === "all") {
      setFilteredRestaurants(restaurants);
      return;
    }
    let filtered = restaurants.filter((r) => r.type === type);
    setFilteredRestaurants(filtered);
  };

  return (
    <>
      <Hero
        title="Order food to your door with us!"
        description="Let us take the strain off cooking for yourself or your family."
        image={HeroImage}
      />
      <Container className="section">
        <div className="restaurant-types">
          {allTypes.map((type, index) => {
            return (
              <button
                className="btn-type"
                onClick={() => filterRestaurants(type)}
                key={index}
              >
                {type}
              </button>
            );
          })}
        </div>
        <Row xs={1} md={2} lg={4} className="g-4">
          {filteredRestaurants.map((restaurant, id) => {
            return <RestaurantCard restaurant={restaurant} key={id} />;
          })}
        </Row>
      </Container>
    </>
  );
};

export default Home;
