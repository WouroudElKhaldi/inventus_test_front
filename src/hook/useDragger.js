import { useEffect, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";

function useDragger(id, table, allTablePositions) {
  const mongoId = table && table._id;
  const isClicked = useRef(false);
  const isDragging = useRef(false);

  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: table.xPosition,
    lastY: table.yPosition,
  });

  useEffect(() => {
    const updateTablePosition = async (x, y) => {
      try {
        await axiosInstance.patch(`/table/position`, {
          id: mongoId,
          xPosition: x,
          yPosition: y,
        });
        console.log("Table position updated successfully");
      } catch (error) {
        console.error("Error updating table position:", error);
      }
    };

    const target = document.getElementById(id);
    if (!target) console.log("Element with given id doesn't exist");

    const container = target.parentElement;
    if (!container) console.log("target element must have a parent");

    const onMouseDown = (e) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
      if (isDragging.current) {
        updateTablePosition(coords.current.lastX, coords.current.lastY);
        isDragging.current = false;
      }
      isClicked.current = false;
    };

    const onMouseMove = (e) => {
      if (!isClicked.current) return;

      isDragging.current = true;
      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
    };

    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [id, mongoId]);

  return { isDragging };
}

export default useDragger;
