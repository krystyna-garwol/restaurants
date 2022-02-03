import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../views/Home";
import { mockRestaurants } from "./mockData";

describe("Home page", () => {
  test("renders hero section text correctly", () => {
    render(<Home restaurants={mockRestaurants} />);
    expect(
      screen.getByText(/Order food to your door with us/)
    ).toBeInTheDocument();
  });
});
