import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Logo from "../assets/logo.png";

const NavBar = ({ admin }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <>
      <Navbar expand="md">
        <Container>
          <Navbar.Brand>
            <NavLink className="menu-item" to="/" exact>
              <img
                className="custom-logo"
                src={Logo}
                alt="feeling so food logo"
              />{" "}
              feeling so <i id="logo-food">food</i>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mobile-nav-style">
              {isAuthenticated ? (
                <>
                  {admin === "admin" && (
                    <NavLink
                      to="/add-restaurant"
                      exact
                      activeClassName="router-link-exact-active"
                      className="menu-item"
                    >
                      Add Restaurant
                    </NavLink>
                  )}
                  <NavLink
                    to="/profile"
                    exact
                    activeClassName="router-link-exact-active"
                    className="menu-item"
                  >
                    Profile
                  </NavLink>
                  <button
                    className="btn-colour"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Nav.Item>
                  <button
                    className="btn-colour"
                    onClick={() => loginWithRedirect()}
                  >
                    Log in
                  </button>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
