import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Container } from "react-bootstrap";

import Spinner from "../components/Spinner";
import Hero from "../components/Hero";
import HeroImage from "../assets/currentorder_hero.jpg";

export const CurrentOrder = () => {
  const { user } = useAuth0();

  const getUserName = () => {
    if (user.nickname.includes(".")) {
      return user.nickname.split(".")[0];
    }
    return user.nickname;
  };

  return (
    <>
      <Hero
        title={`Hi ${getUserName()}`}
        description="View and submit your current order."
        image={HeroImage}
      />
      <Container className="section"></Container>
    </>
  );
};

export default withAuthenticationRequired(CurrentOrder, {
  onRedirecting: () => <Spinner />,
});
