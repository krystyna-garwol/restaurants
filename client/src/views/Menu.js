import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import MenuItem from "../components/MenuItem";
import { getMenus, addMenu } from "../utils/menuRequests";

const Menu = ({ restaurants, admin, token }) => {
  const restaurantId = window.location.pathname.split("/")[2];
  let restaurant = restaurants.filter((r) => r.id === restaurantId)[0];
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    price: "",
    inStock: "",
    restaurantId: restaurantId,
  });
  const [menuItems, setMenuItems] = useState([]);
  const allCourses = ["all", ...new Set(menuItems.map((item) => item.course))];
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);

  useEffect(() => {
    getMenus(setMenuItems, restaurantId);
  }, []);

  useEffect(() => {
    setFilteredMenuItems(menuItems);
  }, [menuItems]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formData.name !== "" &&
      formData.course !== "" &&
      formData.price !== "" &&
      formData.inStock !== "" &&
      formData.restaurantId !== ""
    ) {
      addMenu(formData, setMenuItems, token);
      setFormData({
        name: "",
        course: "",
        price: "",
        inStock: "",
        restaurantId: restaurantId,
      });
    }
  };

  const filterCourses = (course) => {
    if (course === "all") {
      setFilteredMenuItems(menuItems);
      return;
    }
    const filtered = menuItems.filter((item) => item.course === course);
    setFilteredMenuItems(filtered);
  };

  return (
    <>
      <Hero
        title={restaurant && restaurant.name}
        description="Check out our menu for takeaway orders, we deliver."
        image={restaurant && restaurant.image}
      />
      <Container className="section">
        <div className="note">
          Added items are visible under the{" "}
          <Link id="current-order-link" to="/current-order">
            Current Order
          </Link>{" "}
          page, where you can review and update your order before submitting it.
        </div>
        <Row>
          <Col sm={2}>
            <h4>Menu Type</h4>
            {menuItems.length > 0 &&
              allCourses.map((course, index) => {
                return (
                  <p
                    className="p-course"
                    onClick={() => filterCourses(course)}
                    key={index}
                  >
                    {course}
                  </p>
                );
              })}
          </Col>
          <Col sm={10}>
            {menuItems.length > 0 ? (
              filteredMenuItems.map((item) => {
                return (
                  <MenuItem
                    key={item.id}
                    item={item}
                    restaurantId={restaurant && restaurant.id}
                  />
                );
              })
            ) : (
              <div className="no-result">
                {`Menu for ${
                  restaurant && restaurant.name
                } will be available soon!`}
              </div>
            )}
            {admin === "admin" && (
              <div className="add-menu-form">
                <h4>Add Menu</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      size="lg"
                      type="text"
                      placeholder="e.g. Garlic Pizza Bread"
                      name="name"
                      value={formData.name}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group>
                    <Form.Label>Course</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      size="lg"
                      type="text"
                      placeholder="e.g. Starter"
                      name="course"
                      value={formData.course}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      size="lg"
                      type="number"
                      placeholder="0"
                      name="price"
                      value={formData.price}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group>
                    <Form.Label>In Stock</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      size="lg"
                      type="number"
                      placeholder="0"
                      name="inStock"
                      value={formData.inStock}
                    />
                  </Form.Group>
                  <br />
                  <button type="submit" className="btn-colour">
                    Add
                  </button>
                </Form>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Menu;
