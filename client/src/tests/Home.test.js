import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../views/Home";

describe("Home page", () => {
  test("renders hero section text correctly", () => {
    render(<Home />);
    expect(
      screen.getByText(/Order food to your door with us/)
    ).toBeInTheDocument();
  });
});