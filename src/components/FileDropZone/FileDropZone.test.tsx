import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FileDropZone } from "./FileDropZone";

function makeFile(name: string) {
  return new File(["content"], name, { type: "text/plain" });
}

describe("FileDropZone", () => {
  it("renders the default placeholder", () => {
    render(<FileDropZone onFiles={jest.fn()} />);
    expect(screen.getByText(/drag and drop files here/i)).toBeInTheDocument();
  });

  it("renders custom children instead of the placeholder", () => {
    render(
      <FileDropZone onFiles={jest.fn()}>
        <span>Custom prompt</span>
      </FileDropZone>,
    );
    expect(screen.getByText("Custom prompt")).toBeInTheDocument();
    expect(screen.queryByText(/drag and drop files here/i)).not.toBeInTheDocument();
  });

  it("toggles the drag-over state on dragEnter and dragLeave", () => {
    render(<FileDropZone onFiles={jest.fn()} />);
    const zone = screen.getByRole("button");

    fireEvent.dragEnter(zone);
    expect(zone).toHaveClass("over");

    fireEvent.dragLeave(zone);
    expect(zone).not.toHaveClass("over");
  });

  it("calls onFiles with the dropped files", () => {
    const onFiles = jest.fn();
    render(<FileDropZone onFiles={onFiles} />);
    const zone = screen.getByRole("button");
    const file = makeFile("report.pdf");

    fireEvent.drop(zone, { dataTransfer: { files: [file] } });

    expect(onFiles).toHaveBeenCalledWith([file]);
    expect(zone).not.toHaveClass("over");
  });

  it("calls onFiles when a file is chosen via the hidden input", () => {
    const onFiles = jest.fn();
    const { container } = render(<FileDropZone onFiles={onFiles} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile("avatar.png");

    fireEvent.change(input, { target: { files: [file] } });

    expect(onFiles).toHaveBeenCalledWith([file]);
  });

  it("does not call onFiles or enter the over state when disabled", () => {
    const onFiles = jest.fn();
    render(<FileDropZone onFiles={onFiles} disabled />);
    const zone = screen.getByRole("button");

    fireEvent.dragEnter(zone);
    expect(zone).not.toHaveClass("over");

    fireEvent.drop(zone, { dataTransfer: { files: [makeFile("x.txt")] } });
    expect(onFiles).not.toHaveBeenCalled();
    expect(zone).toHaveAttribute("aria-disabled", "true");
  });
});
