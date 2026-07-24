import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InlineEditableField } from "./InlineEditableField";

describe("InlineEditableField", () => {
  it("renders the value as text", () => {
    render(<InlineEditableField value="Acme Corp" onSave={jest.fn()} />);
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
  });

  it("renders the placeholder when value is empty", () => {
    render(
      <InlineEditableField value="" placeholder="Add a name" onSave={jest.fn()} />,
    );
    expect(screen.getByText("Add a name")).toBeInTheDocument();
  });

  it("switches to an input on click, prefilled with the current value", () => {
    render(<InlineEditableField value="Acme Corp" onSave={jest.fn()} />);
    fireEvent.click(screen.getByText("Acme Corp"));
    expect(screen.getByDisplayValue("Acme Corp")).toBeInTheDocument();
  });

  it("commits the new value on Enter", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    render(<InlineEditableField value="Acme Corp" onSave={onSave} />);
    fireEvent.click(screen.getByText("Acme Corp"));
    const input = screen.getByDisplayValue("Acme Corp");
    fireEvent.change(input, { target: { value: "New Name" } });
    fireEvent.keyDown(input, { key: "Enter" });
    await waitFor(() => expect(onSave).toHaveBeenCalledWith("New Name"));
    expect(screen.queryByDisplayValue("New Name")).not.toBeInTheDocument();
  });

  it("commits on blur", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    render(<InlineEditableField value="Acme Corp" onSave={onSave} />);
    fireEvent.click(screen.getByText("Acme Corp"));
    const input = screen.getByDisplayValue("Acme Corp");
    fireEvent.change(input, { target: { value: "Blurred Name" } });
    fireEvent.blur(input);
    await waitFor(() => expect(onSave).toHaveBeenCalledWith("Blurred Name"));
  });

  it("does not call onSave if the value did not change", async () => {
    const onSave = jest.fn();
    render(<InlineEditableField value="Acme Corp" onSave={onSave} />);
    fireEvent.click(screen.getByText("Acme Corp"));
    fireEvent.keyDown(screen.getByDisplayValue("Acme Corp"), { key: "Enter" });
    await waitFor(() =>
      expect(screen.queryByDisplayValue("Acme Corp")).not.toBeInTheDocument(),
    );
    expect(onSave).not.toHaveBeenCalled();
  });

  it("cancels on Escape without calling onSave", () => {
    const onSave = jest.fn();
    render(<InlineEditableField value="Acme Corp" onSave={onSave} />);
    fireEvent.click(screen.getByText("Acme Corp"));
    const input = screen.getByDisplayValue("Acme Corp");
    fireEvent.change(input, { target: { value: "Discarded" } });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("does not enter edit mode when disabled", () => {
    render(
      <InlineEditableField value="Acme Corp" disabled onSave={jest.fn()} />,
    );
    fireEvent.click(screen.getByText("Acme Corp"));
    expect(screen.queryByDisplayValue("Acme Corp")).not.toBeInTheDocument();
  });

  it("recovers cleanly when onSave rejects", async () => {
    const onSave = jest.fn().mockRejectedValue(new Error("nope"));
    render(<InlineEditableField value="Acme Corp" onSave={onSave} />);
    fireEvent.click(screen.getByText("Acme Corp"));
    const input = screen.getByDisplayValue("Acme Corp");
    fireEvent.change(input, { target: { value: "New Name" } });
    fireEvent.keyDown(input, { key: "Enter" });
    await waitFor(() => expect(onSave).toHaveBeenCalledWith("New Name"));
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
  });
});
