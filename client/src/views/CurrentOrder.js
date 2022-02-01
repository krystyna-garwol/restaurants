import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import history from "../utils/history";

import Spinner from "../components/Spinner";
import Hero from "../components/Hero";
import MenuItem from "../components/MenuItem";
import HeroImage from "../assets/currentorder_hero.jpg";
import { completeOrders } from "../utils/orderRequests";

export const CurrentOrder = ({ pendingOrders, setPendingOrders, token }) => {
  const { user } = useAuth0();

  const getUserName = () => {
    if (user.nickname.includes(".")) {
      return user.nickname.split(".")[0];
    }
    return user.nickname;
  };

  const getTotal = () => {
    let total = 0;
    pendingOrders.map((order) => {
      total += order.quantity * order.price;
    });
    return total;
  };

  const completeCurrentOrders = () => {
    completeOrders(pendingOrders, setPendingOrders, user.sub, token);
  };

  return (
    <>
      <Hero
        title={`Hi ${getUserName()}`}
        description="View and submit your current order."
        image={HeroImage}
      />
      <Container className="section">
        <h4>Review your order before submitting:</h4>
        <Row>
          {pendingOrders.map((order) => {
            return (
              <>
                <p>{order.restaurantName}</p>
                <MenuItem
                  key={order.id}
                  item={order}
                  token={token}
                  setPendingOrders={setPendingOrders}
                />
              </>
            );
          })}
        </Row>
        <Row>
          <h5>{`Total: £${getTotal()}`}</h5>
        </Row>
        <Row className="co-btn-group">
          <Col>
            <button onClick={() => history.goBack()} className="btn-colour">
              Go Back
            </button>
          </Col>
          <Col className="co-btn-submit">
            <button
              onClick={() => completeCurrentOrders()}
              className="btn-submit"
            >
              Submit
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default withAuthenticationRequired(CurrentOrder, {
  onRedirecting: () => <Spinner />,
});
