import React from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer>
      <Link className="menu-item" to="/">
        <img className="custom-logo" src={Logo} alt="feeling so food logo" />{" "}
        feeling so <i id="logo-food">food</i>
      </Link>
      <p className="copyright">&copy; feeling so food 2021</p>
    </footer>
  );
};

export default Footer;
