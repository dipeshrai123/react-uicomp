import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CascadingSettingsToggle } from "./CascadingSettingsToggle";

function setup(parentChecked = true) {
  const onParentChange = jest.fn();
  const onEmailChange = jest.fn();
  const onSmsChange = jest.fn();

  render(
    <CascadingSettingsToggle
      parent={{ label: "Notifications", checked: parentChecked, onChange: onParentChange }}
      children={[
        { key: "email", label: "Email", checked: true, onChange: onEmailChange },
        { key: "sms", label: "SMS", checked: false, onChange: onSmsChange },
      ]}
    />,
  );

  return { onParentChange, onEmailChange, onSmsChange };
}

describe("CascadingSettingsToggle", () => {
  it("renders the parent and child labels", () => {
    setup();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("SMS")).toBeInTheDocument();
  });

  it("calls the parent onChange when its switch is toggled", () => {
    const { onParentChange } = setup(true);
    const switches = screen.getAllByRole("switch");
    fireEvent.click(switches[0]);
    expect(onParentChange).toHaveBeenCalledWith(false);
  });

  it("calls a child's own onChange when its switch is toggled", () => {
    const { onEmailChange } = setup(true);
    const switches = screen.getAllByRole("switch");
    fireEvent.click(switches[1]);
    expect(onEmailChange).toHaveBeenCalledWith(false);
  });

  it("disables child switches when the parent is off", () => {
    setup(false);
    const switches = screen.getAllByRole("switch");
    expect(switches[1]).toBeDisabled();
    expect(switches[2]).toBeDisabled();
  });

  it("enables child switches when the parent is on", () => {
    setup(true);
    const switches = screen.getAllByRole("switch");
    expect(switches[1]).not.toBeDisabled();
    expect(switches[2]).not.toBeDisabled();
  });

  it("respects a child's own disabled flag even when the parent is on", () => {
    render(
      <CascadingSettingsToggle
        parent={{ label: "Notifications", checked: true, onChange: jest.fn() }}
        children={[
          { key: "email", label: "Email", checked: true, onChange: jest.fn(), disabled: true },
        ]}
      />,
    );
    const switches = screen.getAllByRole("switch");
    expect(switches[1]).toBeDisabled();
  });
});
