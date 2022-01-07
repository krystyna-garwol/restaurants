import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const NavBar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <nav>
      <NavLink to="/" className="logo-text">
        <img className="logo" src={logo} alt="Restaurants logo" /> feeling so{" "}
        <i id="logo-food">food</i>
      </NavLink>
      <div className="nav-right">
        <NavLink
          to="/sign-restaurant"
          className="nav-item"
          activeClassName="router-link-exact-active"
        >
          Add Your Restaurant
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/profile"
            className="nav-item"
            activeClassName="router-link-exact-active"
          >
            Profile
          </NavLink>
        )}
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect()}>Log in</button>
        )}
        {isAuthenticated && (
          <div>
            <img
              src={user.picture}
              alt="Profile"
              className="nav-user-profile rounded-circle"
              width="45"
            />

            <button onClick={() => logoutWithRedirect()}>Log out</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
