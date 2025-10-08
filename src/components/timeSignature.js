import React, { useState } from "react";

export default function CanvasTimeSignature({
  numerator,
  setNumerator,
  denominator,
  setDenominator,
  stageScale,
  stageSize,
}) {
  const [isEditing, setIsEditing] = useState(true);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") setIsEditing(false);
  };

  const handleClick = () => setIsEditing(true);

  return (
    <div
      onClick={handleClick}
      style={{
        position: "absolute",
        top: 90 * stageScale,
        left: 250 * stageScale,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        zIndex: 10,
        pointerEvents: "auto",
      }}
    >
      {/* Numerator */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline", // biar angka sejajar garis bawah label
          marginBottom: `${4 * stageScale}px`,
        }}
      >
        <label
          style={{
            marginRight: `${8 * stageScale}px`,
            fontSize: `${10 * stageScale}px`,
            minWidth: `${40 * stageScale}px`, // konsisten jarak
            textAlign: "right",
          }}
        >
          Num:
        </label>
        {isEditing ? (
          <input
            type="text"
            value={numerator}
            onChange={(e) => setNumerator(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="num"
            style={{
              width: `${30 * stageScale}px`,
              fontSize: `${15 * stageScale}px`,
              textAlign: "center",
              border: "none",
              borderBottom: "2px solid black",
              outline: "none",
              background: "transparent",
              padding: "0",
            }}
          />
        ) : (
          <span
            style={{
              fontSize: `${15 * stageScale}px`,
              cursor: "pointer",
              paddingBottom: "2px",
              borderBottom: "2px solid black",
              display: "inline-block",
              width: `${30 * stageScale}px`,
              textAlign: "center",
            }}
          >
            {numerator}
          </span>
        )}
      </div>

      {/* Denominator */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <label
          style={{
            marginRight: `${8 * stageScale}px`,
            fontSize: `${10 * stageScale}px`,
            minWidth: `${40 * stageScale}px`,
            textAlign: "right",
          }}
        >
          Den:
        </label>
        {isEditing ? (
          <input
            type="text"
            value={denominator}
            onChange={(e) => setDenominator(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="den"
            style={{
              width: `${30 * stageScale}px`,
              fontSize: `${15 * stageScale}px`,
              textAlign: "center",
              border: "none",
              borderBottom: "2px solid black",
              outline: "none",
              background: "transparent",
              padding: "0",
            }}
          />
        ) : (
          <span
            style={{
              fontSize: `${22 * stageScale}px`,
              cursor: "pointer",
              paddingBottom: "2px",
              borderBottom: "2px solid black",
              display: "inline-block",
              width: `${30 * stageScale}px`,
              textAlign: "center",
            }}
          >
            {denominator}
          </span>
        )}
      </div>
    </div>
  );
}
