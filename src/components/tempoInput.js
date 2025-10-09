import { useState } from "react";

export default function TempoInput({ tempo, setTempo, stageScale = 1 }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 130 * stageScale,
        right: 282 * stageScale, // posisinya di kanan atas (berlawanan dengan Do)
        display: "flex",
        alignItems: "center",
        gap: `${8 * stageScale}px`,
        zIndex: 10,
      }}
    >
      <label
        style={{
          fontSize: `${12 * stageScale}px`,
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        Tempo ♩ =
      </label>

      {isEditing ? (
        <input
          type="number"
          value={tempo}
          onChange={(e) => setTempo(e.target.value)}
          onKeyDown={handleKeyDown}
          min={10}
          max={200}
          autoFocus
          style={{
            width: `${60 * stageScale}px`,
            fontSize: `${12 * stageScale}px`,
            textAlign: "center",
            padding: `${4 * stageScale}px`,
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "transparent",
            outline: "none",
          }}
        />
      ) : (
        <span
          onClick={handleClick}
          style={{
            fontSize: `${16 * stageScale}px`,
            cursor: "pointer",
            minWidth: `${60 * stageScale}px`,
            textAlign: "center",
            display: "inline-block",
          }}
        >
          {tempo || "--"}
        </span>
      )}
    </div>
  );
}
