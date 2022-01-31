import React from "react";
import Card from "react-bootstrap/Card";

const MenuItem = ({ item }) => {
  return (
    <Card className="card-menu-item">
      <div className="rest-menu-item">
        <div>{item.name}</div>
        <div>£ {item.price}</div>
      </div>
    </Card>
  );
};

export default MenuItem;
