import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookTable from "../views/BookTable";

describe("Book Table page", () => {
  test("renders hero section text correctly", () => {
    render(<BookTable />);
    expect(screen.getByText(/Book a Table/)).toBeInTheDocument();
  });
});
