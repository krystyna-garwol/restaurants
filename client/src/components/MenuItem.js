import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useAuth0 } from "@auth0/auth0-react";

import { addOrder } from "../utils/orderRequests";

const MenuItem = ({ item, restaurantId, setPendingOrders, token }) => {
  const { user } = useAuth0();
  const [formData, setFormData] = useState({
    name: item.name,
    quantity: "",
    total: item.price,
    restaurantId: restaurantId,
    completed: 0,
    userId: user.sub,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const addToCurrentOrder = () => {
    if (formData.quantity && user) {
      addOrder(formData, setPendingOrders, user.sub, token);
    }
  };

  return (
    <Card className="card-menu-item">
      <div className="rest-menu-item">
        <div>{item.name}</div>
        <div>£ {item.price}</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ paddingRight: "0.5rem" }}>Quantity</div>
          <Form style={{ marginRight: "0.5rem" }}>
            <Form.Control
              name="quantity"
              type="number"
              placeholder="0"
              onChange={handleChange}
            ></Form.Control>
          </Form>
          <button
            onClick={() => addToCurrentOrder()}
            type="submit"
            className="btn-colour"
          >
            Add
          </button>
        </div>
      </div>
    </Card>
  );
};

export default MenuItem;
