import React, { useState, useEffect } from "react";
import { useNodes } from "@xyflow/react";
import "./toolboxpannel.css"; 

function DetailsBar() {
  const nodes = useNodes();

  // State to manage position of sidebar
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Start dragging (React MouseEvent)
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // During dragging (Native MouseEvent)
  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  // Stop dragging
  const onMouseUp = () => {
    setIsDragging(false);
  };

  // Dock logic (optional)
  const dockToEdge = () => {
    if (position.x < 100) {
      setPosition({ x: 0, y: position.y });
    } else if (position.x > window.innerWidth - 100) {
      setPosition({ x: window.innerWidth - 200, y: position.y });
    }
  };

  useEffect(() => {
    if (isDragging) {
      // Add event listeners (casting to MouseEvent for global window events)
      window.addEventListener("mousemove", onMouseMove as EventListener);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      // Remove event listeners
      window.removeEventListener("mousemove", onMouseMove as EventListener);
      window.removeEventListener("mouseup", onMouseUp);
      dockToEdge();
    }

    // Cleanup on component unmount or when dragging stops
    return () => {
      window.removeEventListener("mousemove", onMouseMove as EventListener);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, position]);

  return (
    <aside
      className={`detailsbar ${isDragging ? "dragging" : ""}`}
      style={{
        top: position.y,
        left: position.x,
      }}
      onMouseDown={onMouseDown}
    >
      <h3>Flow Sidebar</h3>
      <div className="node-list">
        {nodes.map((node) => (
          <div key={node.id} className="node-item">
            <strong>Node {node.id}</strong>
            <div className="coordinates">
              x: {node.position.x.toFixed(2)}, y: {node.position.y.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default DetailsBar;
