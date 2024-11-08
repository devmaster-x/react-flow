import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DetailsBar from "./DetailsBar";
import { useModalContext } from "@/contexts/ModalContext";
import { useNodes } from "@xyflow/react";
import { initialNodes } from "@/Constants"; // Assuming this is where initialNodes are imported from

// Mocking external dependencies
jest.mock("@/contexts/ModalContext", () => ({
  useModalContext: jest.fn(),
}));

jest.mock("@xyflow/react", () => ({
  useNodes: jest.fn(),
}));

describe("DetailsBar", () => {
  it("renders the node data correctly", () => {
    // Mock the context values
    (useModalContext as jest.Mock).mockReturnValue({ visibleDetailBar: true });

    // Mocking the node data from initialNodes
    (useNodes as jest.Mock).mockReturnValue(initialNodes);

    render(<DetailsBar />);

    // Check if the sidebar is rendered
    expect(screen.getByText("Flow Sidebar")).toBeInTheDocument();

    // Check if the nodes from initialNodes are rendered with correct data
    expect(screen.getByText("Node 1")).toBeInTheDocument();
    expect(screen.getByText("type : m_input")).toBeInTheDocument();
    expect(screen.getByText("x: 0.00, y: 0.00")).toBeInTheDocument();

    expect(screen.getByText("Node 2")).toBeInTheDocument();
    expect(screen.getByText("type : m_default")).toBeInTheDocument();
    expect(screen.getByText("x: 0.00, y: 100.00")).toBeInTheDocument();

    expect(screen.getByText("Node 3")).toBeInTheDocument();
    expect(screen.getByText("type : m_output")).toBeInTheDocument();
    expect(screen.getByText("x: 200.00, y: 100.00")).toBeInTheDocument();
  });
});
