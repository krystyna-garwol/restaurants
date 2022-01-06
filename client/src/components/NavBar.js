import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <div>
      <nav>
        <div>LOGO</div>
        <NavLink to="/" exact activeClassName="router-link-exact-active">
          Home
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/profile"
            exact
            activeClassName="router-link-exact-active"
          >
            Profile
          </NavLink>
        )}
        {!isAuthenticated && (
          <button
            id="qsLoginBtn"
            color="primary"
            className="btn-margin"
            onClick={() => loginWithRedirect()}
          >
            Log in
          </button>
        )}
        {isAuthenticated && (
          <div>
            <img
              src={user.picture}
              alt="Profile"
              className="nav-user-profile rounded-circle"
              width="50"
            />

            <button
              id="qsLoginBtn"
              color="primary"
              className="btn-margin"
              onClick={() => logoutWithRedirect()}
            >
              Log out
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
