import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../../../src/components/ui/Button/Button";

describe("Button component", () => {
  afterEach(cleanup);

  test("when children is provided", () => {
    render(<Button>Children</Button>);

    expect(screen.getByText("Children")).toBeVisible();
  });

  test("when an onClick callback is provided", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Children</Button>);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Children")).toBeVisible();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
