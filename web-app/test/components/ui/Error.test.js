import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Error from "../../../src/components/ui/Error/Error";

describe("Error component", () => {
  afterEach(cleanup);

  test("when children is provided", () => {
    render(<Error>Children</Error>);

    expect(screen.getByText("Children")).toBeVisible();
  });

  test("when a CTA prop is provided", () => {
    const cta = <div>CTA</div>;
    render(<Error cta={cta}>Children</Error>);

    expect(screen.getByText("Children")).toBeVisible();
    expect(screen.getByText("CTA")).toBeVisible();
  });
});
