import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";

import Hero from "../components/Hero";
import RestaurantCard from "../components/RestaurantCard";
import HeroImage from "../assets/homepgae_hero.jpg";

const Home = ({ restaurants }) => {
  let allTypes = ["all", ...new Set(restaurants.map((r) => r.type))];
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const filterRestaurants = (type) => {
    if (type === "all") {
      setFilteredRestaurants(restaurants);
      return;
    }
    let filtered = restaurants.filter((r) => r.type === type);
    setFilteredRestaurants(filtered);
  };

  useEffect(() => {
    setFilteredRestaurants(restaurants);
  }, [restaurants]);

  return (
    <>
      <Hero
        title="Order food to your door with us"
        description="or book a table to dine in!"
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
