import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CommandPalette, type Command } from "./CommandPalette";

function makeCommands(onSelect: (id: string) => void): Command[] {
  return [
    { id: "new-project", label: "Create new project", onSelect: () => onSelect("new-project") },
    { id: "invite", label: "Invite teammate", onSelect: () => onSelect("invite") },
    { id: "billing", label: "Go to billing settings", onSelect: () => onSelect("billing") },
  ];
}

describe("CommandPalette", () => {
  it("renders nothing when closed", () => {
    render(
      <CommandPalette commands={makeCommands(() => {})} open={false} onOpenChange={() => {}} />,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders the command list when open", () => {
    render(
      <CommandPalette commands={makeCommands(() => {})} open onOpenChange={() => {}} />,
    );
    expect(screen.getByRole("dialog", { name: "Command palette" })).toBeInTheDocument();
    expect(screen.getByText("Create new project")).toBeInTheDocument();
    expect(screen.getByText("Invite teammate")).toBeInTheDocument();
  });

  it("filters commands by the search query", () => {
    render(
      <CommandPalette commands={makeCommands(() => {})} open onOpenChange={() => {}} />,
    );
    fireEvent.change(screen.getByLabelText("Search commands"), {
      target: { value: "invite" },
    });
    expect(screen.getByText("Invite teammate")).toBeInTheDocument();
    expect(screen.queryByText("Create new project")).not.toBeInTheDocument();
  });

  it("shows the empty message when nothing matches", () => {
    render(
      <CommandPalette commands={makeCommands(() => {})} open onOpenChange={() => {}} />,
    );
    fireEvent.change(screen.getByLabelText("Search commands"), {
      target: { value: "zzz" },
    });
    expect(screen.getByText("No matching commands")).toBeInTheDocument();
  });

  it("selects the first result and closes on Enter", () => {
    const onSelect = jest.fn();
    const onOpenChange = jest.fn();
    render(
      <CommandPalette
        commands={makeCommands(onSelect)}
        open
        onOpenChange={onOpenChange}
      />,
    );
    fireEvent.keyDown(screen.getByLabelText("Search commands"), { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("new-project");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("moves the active selection with arrow keys", () => {
    const onSelect = jest.fn();
    render(
      <CommandPalette commands={makeCommands(onSelect)} open onOpenChange={() => {}} />,
    );
    const input = screen.getByLabelText("Search commands");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("invite");
  });

  it("closes on Escape", () => {
    const onOpenChange = jest.fn();
    render(
      <CommandPalette commands={makeCommands(() => {})} open onOpenChange={onOpenChange} />,
    );
    fireEvent.keyDown(screen.getByLabelText("Search commands"), { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes when the backdrop is clicked but not when the panel is clicked", () => {
    const onOpenChange = jest.fn();
    render(
      <CommandPalette commands={makeCommands(() => {})} open onOpenChange={onOpenChange} />,
    );
    fireEvent.click(screen.getByRole("dialog"));
    expect(onOpenChange).not.toHaveBeenCalled();

    const backdrop = screen.getByRole("dialog").parentElement!.parentElement!;
    fireEvent.click(backdrop);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("selects a command when clicked directly", () => {
    const onSelect = jest.fn();
    const onOpenChange = jest.fn();
    render(
      <CommandPalette commands={makeCommands(onSelect)} open onOpenChange={onOpenChange} />,
    );
    fireEvent.click(screen.getByText("Go to billing settings"));
    expect(onSelect).toHaveBeenCalledWith("billing");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("toggles open via the Cmd/Ctrl+K global shortcut", () => {
    const onOpenChange = jest.fn();
    render(
      <CommandPalette commands={makeCommands(() => {})} open={false} onOpenChange={onOpenChange} />,
    );
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
