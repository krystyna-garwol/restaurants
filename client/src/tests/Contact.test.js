import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contact from "../views/Contact";

describe("Contact page", () => {
  test("renders hero section text correctly", () => {
    render(<Contact />);
    expect(
      screen.getByText(/Get in touch if you have any questions/)
    ).toBeInTheDocument();
  });
});
