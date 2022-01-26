import React from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer-one">
        <Link className="menu-item" to="/">
          <img className="custom-logo" src={Logo} alt="feeling so food logo" />{" "}
          feeling so <i id="logo-food">food</i>
        </Link>
        <Link to="/add-restaurant" className="menu-item">
          Add Your Restaurant
        </Link>
      </div>
      <hr />
      <div className="footer-two">
        <p className="copyright">&copy; feeling so food 2021</p>
      </div>
    </footer>
  );
};

export default Footer;
