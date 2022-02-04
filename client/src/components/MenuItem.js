import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useAuth0 } from "@auth0/auth0-react";

import { FaEdit } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";

import { addOrder, updateOrder, deleteOrder } from "../utils/orderRequests";

const MenuItem = ({ item, restaurantId, setPendingOrders, token }) => {
  const { user, loginWithRedirect } = useAuth0();
  const userId = user && user.sub;
  const [formData, setFormData] = useState({
    id: item.id,
    name: item.name,
    quantity: "",
    price: item.price,
    restaurantId: restaurantId,
    completed: 0,
    userId: userId,
  });
  const [error, setError] = useState();
  const [errorResponse, setErrorResponse] = useState({});

  const pathName = window.location.pathname;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (error) setError(null);
    if (errorResponse) setErrorResponse({});
  };

  const addToCurrentOrder = () => {
    const newError = findFormErrors();

    if (!user) {
      loginWithRedirect();
    } else if (newError) {
      setError(newError);
    } else {
      addOrder(formData, setPendingOrders, userId, token, setErrorResponse);
      setFormData({
        id: item.id,
        name: item.name,
        quantity: "",
        price: item.price,
        restaurantId: restaurantId,
        completed: 0,
        userId: userId,
      });
    }
  };

  const updateCurrentOrder = () => {
    const newError = findFormErrors();
    if (newError) {
      setError(newError);
    } else {
      updateOrder(formData, setPendingOrders, userId, token);
      setFormData({
        id: item.id,
        name: item.name,
        quantity: "",
        price: item.price,
        restaurantId: restaurantId,
        completed: 0,
        userId: userId,
      });
    }
  };

  const deleteCurrentOrder = () => {
    deleteOrder(item.id, userId, setPendingOrders, token);
  };

  const findFormErrors = () => {
    let newError = "";
    if (!formData.quantity || formData.quantity === 0) {
      newError = "Please provide a quantity.";
    } else if (formData.quantity > 5)
      newError = "You can only order a maximum of 5 items.";
    return newError;
  };

  return (
    <Card className="card-menu-item">
      <Col>
        <span style={{ color: "red" }}>{errorResponse.message}</span>
      </Col>
      <div className="rest-menu-item">
        <Col lg={4} md={4} xs={8}>
          <div>
            <b>{item.name}</b>
          </div>
        </Col>
        <Col lg={4} md={4} xs={4} className="rest-menu-col-price">
          <div>£ {item.price}</div>
        </Col>
        <Col lg={4} md={4} xs={12} className="rest-menu-col-form">
          <div className="rest-menu-col-content">
            <div className="quantity-item">
              {pathName.includes("current-order")
                ? `Quantity: ${item.quantity}`
                : "Quantity"}
            </div>
            <Form className="rest-menu-form">
              <Form.Control
                name="quantity"
                type="number"
                placeholder="0"
                onChange={handleChange}
                value={formData.quantity}
                isInvalid={error}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form>
            {pathName.includes("current-order") ? (
              <>
                <FaEdit
                  className="btn-edit"
                  onClick={() => updateCurrentOrder()}
                />
                <FaRegTimesCircle
                  className="btn-delete"
                  onClick={() => deleteCurrentOrder()}
                />
              </>
            ) : (
              <button
                onClick={() => addToCurrentOrder()}
                type="submit"
                className="btn-colour"
              >
                Add
              </button>
            )}
          </div>
        </Col>
      </div>
    </Card>
  );
};

export default MenuItem;
