import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PresenceStack, type PresenceUser } from "./PresenceStack";

const USERS: PresenceUser[] = [
  { id: "1", name: "Ava Chen" },
  { id: "2", name: "Liam Patel" },
  { id: "3", name: "Noor Haddad" },
];

describe("PresenceStack", () => {
  it("renders an avatar per user up to max", () => {
    render(<PresenceStack users={USERS} />);
    expect(screen.getByTitle("Ava Chen")).toBeInTheDocument();
    expect(screen.getByTitle("Liam Patel")).toBeInTheDocument();
    expect(screen.getByTitle("Noor Haddad")).toBeInTheDocument();
  });

  it("shows initials when no avatarUrl is given", () => {
    render(<PresenceStack users={[{ id: "1", name: "Ava Chen" }]} />);
    expect(screen.getByText("AC")).toBeInTheDocument();
  });

  it("collapses users beyond max into an overflow badge", () => {
    render(<PresenceStack users={USERS} max={2} />);
    expect(screen.getByTitle("Ava Chen")).toBeInTheDocument();
    expect(screen.getByTitle("Liam Patel")).toBeInTheDocument();
    expect(screen.queryByTitle("Noor Haddad")).not.toBeInTheDocument();
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("renders nothing extra when users fit within max", () => {
    render(<PresenceStack users={USERS} max={5} />);
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it("renders an active indicator only for active users", () => {
    render(
      <PresenceStack
        users={[
          { id: "1", name: "Ava Chen", active: true },
          { id: "2", name: "Liam Patel" },
        ]}
      />,
    );
    expect(screen.getByLabelText("Active")).toBeInTheDocument();
  });

  it("renders an empty group with no avatars", () => {
    render(<PresenceStack users={[]} />);
    expect(screen.getByRole("group", { name: "Active collaborators" })).toBeEmptyDOMElement();
  });
});
