import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../views/Home";

describe("Home", () => {
  test("Renders h1 correctly", () => {
    render(<Home />);
    expect(
      screen.getByText(/Order food to your door with us/)
    ).toBeInTheDocument();
  });
});
