import React, { useState } from "react";

export default function CanvasTitle({
  title,
  setTitle,
  stageScale,
  stageSize,
}) {
  const [isEditing, setIsEditing] = useState(true);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false); // ✅ lock editing on Enter
    }
  };

  const handleClick = () => {
    setIsEditing(true); // ✅ allow editing again on click
  };

  return (
    <div
      style={{
        position: "absolute",
        top: `${40 * stageScale}px`,
        left: "50%",
        transform: "translateX(-50%)",
        width: `${stageSize.width * stageScale * 0.8}px`,
        textAlign: "center",
        zIndex: 10,
      }}
      onClick={handleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Title"
          autoFocus
          style={{
            width: "100%",
            fontSize: `${24 * stageScale}px`,
            textAlign: "center",
            border: "none",
            borderBottom: "2px solid black",
            outline: "none",
            background: "transparent",
          }}
        />
      ) : (
        <div
          style={{
            fontSize: `${24 * stageScale}px`,
            borderBottom: "2px solid black",
            cursor: "pointer",
            paddingBottom: "2px",
            userSelect: "none",
          }}
        >
          {title || "Click to edit"}
        </div>
      )}
    </div>
  );
}
