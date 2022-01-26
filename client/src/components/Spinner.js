import React from "react";

import spinner from "../assets/spinner.svg";

const Spinner = () => (
  <div className="spinner">
    <img src={spinner} alt="Loading spinner" />
  </div>
);

export default Spinner;
