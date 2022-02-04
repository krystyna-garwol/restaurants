import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Logo from "../assets/logo.png";

const Footer = ({ pendingOrders }) => {
  const { pathname } = useLocation();

  const check =
    (pendingOrders.length === 1 || pendingOrders.length === 0) &&
    pathname.includes("current-order");

  return (
    <>
      {pathname.includes("menu") ? null : (
        <footer className={check ? "fixed-bottom" : null}>
          <div className="footer-one">
            <Link className="menu-item" to="/">
              <img
                className="custom-logo"
                src={Logo}
                alt="Le Restaurant logo"
              />{" "}
              Le Restaurant
            </Link>
            <div>
              <Link to="/book-table" className="menu-item">
                Book Table
              </Link>
              <Link to="/contact" className="menu-item">
                Contact
              </Link>
            </div>
          </div>
          <hr />
          <div className="footer-two">
            <p className="copyright">&copy; Le Restaurant 2022</p>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
