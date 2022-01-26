import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="fixed-bottom">
      <div className="footer-one">
        <div>
          <img className="custom-logo" src={Logo} alt="feeling so food logo" />{" "}
          feeling so <i id="logo-food">food</i>
        </div>
        <NavLink to="/add-restaurant" exact className="menu-item">
          Add Your Restaurant
        </NavLink>
      </div>
      <hr />
      <div className="footer-two">
        <p className="copyright">&copy; feeling so food 2021</p>
      </div>
    </footer>
  );
};

export default Footer;
