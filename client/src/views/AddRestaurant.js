import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Spinner from "../components/Spinner";

import Hero from "../components/Hero";
import HeroImage from "../assets/addrestaurant.hero.jpg";
import { addRestaurant } from "../utils/restaurantRequests";

const AddRestaurant = ({ setRestaurants, token }) => {
  const { isLoading } = useAuth0();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    type: "",
  });
  const [formImage, setFormImage] = useState();
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (errors[event.target.name]) {
      setErrors({ ...errors, [event.target.name]: null });
    }
  };

  const handleImage = (event) => {
    setFormImage(event.target.files[0]);
    if (errors.image) {
      setErrors({ ...errors, image: null });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      addRestaurant(formData, formImage, setRestaurants, token);
      setFormData({
        name: "",
        city: "",
        type: "",
      });
    }
  };

  const findFormErrors = () => {
    const { name, city, type } = formData;
    const newErrors = {};

    if (!name || name === "") newErrors.name = "Please provide a name.";
    else if (name.length > 20)
      newErrors.name = "Name is too long. The maximum length is 30 characters.";

    if (!city || city === "") newErrors.city = "Please provide a city.";
    if (!type || type === "") newErrors.type = "Please provide a type.";
    if (!formImage || formImage === {})
      newErrors.image = "Please add an image.";
    return newErrors;
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Hero title="Add Restaurant" image={HeroImage} />
      <Container className="section">
        <div className="form-border">
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
                isInvalid={errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
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
                isInvalid={errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
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
                isInvalid={errors.type}
              />
              <Form.Control.Feedback type="invalid">
                {errors.type}
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                onChange={handleImage}
                type="file"
                name="image"
                isInvalid={errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Form.Group>
            <button type="submit" className="btn-colour">
              Add
            </button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default withAuthenticationRequired(AddRestaurant, {
  onRedirecting: () => <Spinner />,
});
