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

const CurrentOrder = ({ pendingOrders, setPendingOrders, token }) => {
  const { user } = useAuth0();

  const getUserName = () => {
    const userNickname = user && user.nickname;
    if (user && userNickname.includes(".")) {
      return userNickname.split(".")[0];
    }
    return userNickname;
  };

  const getTotal = () => {
    let total = 0;
    pendingOrders.forEach((order) => {
      total += order.quantity * order.price;
    });
    return total.toFixed(2);
  };

  const completeCurrentOrders = () => {
    completeOrders(pendingOrders, setPendingOrders, user.sub, token);
  };

  return (
    <>
      <Hero
        title={`Hi ${getUserName()}`}
        description="Here you can view, update and finalise your order."
        image={HeroImage}
      />
      <Container className="section">
        {pendingOrders && pendingOrders.length > 0 ? (
          <>
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
              <h5 className="co-total">{`Total: £${getTotal()}`}</h5>
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
          </>
        ) : (
          <h5>You don't have any pending orders.</h5>
        )}
      </Container>
    </>
  );
};

export default withAuthenticationRequired(CurrentOrder, {
  onRedirecting: () => <Spinner />,
});
