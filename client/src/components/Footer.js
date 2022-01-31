import React from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer>
      <Link className="menu-item" to="/">
        <img className="custom-logo" src={Logo} alt="Le Restaurant logo" /> Le
        Restaurant
      </Link>
      <p className="copyright">&copy; Le Restaurant 2022</p>
    </footer>
  );
};

export default Footer;
