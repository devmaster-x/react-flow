"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useNodes } from "@xyflow/react";
import { useModalContext } from "@/contexts/ModalContext";
import { NodeType } from "../nodes/type";
import "./DetailsBar.css";

const DetailsBar: React.FC = () => {
  const nodes = useNodes<NodeType>();
  const { visibleDetailBar } = useModalContext();

  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  }, [isDragging, offset]);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const dockToEdge = useCallback(() => {
    setPosition((prevPosition) => {
      if (prevPosition.x < 100) {
        return { x: 0, y: prevPosition.y };
      } else if (prevPosition.x > window.innerWidth - 100) {
        return { x: window.innerWidth - 200, y: prevPosition.y };
      }
      return prevPosition;
    });
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      dockToEdge();
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp, dockToEdge]);

  if (!visibleDetailBar) return null;

  return (
    <aside
      className={`detailsbar ${isDragging ? "dragging" : ""}`}
      style={{ top: position.y, left: position.x }}
      onMouseDown={onMouseDown}
    >
      <h3>Flow Sidebar</h3>
      <div className="node-list">
        {nodes.map((node) => (
          <div key={node.id} className="node-item">
            <strong>{node.data.label}</strong>
            <div>Type: {node.type}</div>
            <div className="coordinates">
              x: {node.position.x.toFixed(2)}, y: {node.position.y.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default DetailsBar;
