import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Menu from "../views/Menu";

describe("Menu page", () => {
  test("renders hero section text correctly", () => {
    render(<Menu />);
    expect(
      screen.getByText(/Check out our menu for takeaway orders, we deliver/)
    ).toBeInTheDocument();
  });
});
