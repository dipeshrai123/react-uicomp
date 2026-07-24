import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CooldownButton } from "./CooldownButton";

describe("CooldownButton", () => {
  it("renders its label", () => {
    render(
      <CooldownButton cooldownMs={1000} onClick={jest.fn()}>
        Resend code
      </CooldownButton>,
    );
    expect(screen.getByRole("button", { name: "Resend code" })).toBeInTheDocument();
  });

  it("calls onClick and disables the button on click", () => {
    const onClick = jest.fn();
    render(
      <CooldownButton cooldownMs={1000} onClick={onClick}>
        Resend code
      </CooldownButton>,
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("re-enables once the cooldown elapses", async () => {
    render(
      <CooldownButton cooldownMs={40} onClick={jest.fn()}>
        Resend code
      </CooldownButton>,
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(button).toBeDisabled();
    await waitFor(() => expect(button).not.toBeDisabled(), { timeout: 2000 });
  });

  it("ignores clicks while already in cooldown", () => {
    const onClick = jest.fn();
    render(
      <CooldownButton cooldownMs={1000} onClick={onClick}>
        Resend code
      </CooldownButton>,
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not respond to clicks when disabled", () => {
    const onClick = jest.fn();
    render(
      <CooldownButton cooldownMs={1000} onClick={onClick} disabled>
        Resend code
      </CooldownButton>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
