import { useState } from "react";

function Dot() {
  const [value, setValue] = useState(null); // null = no number assigned
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    if (editing) return;
    setEditing(true);
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      const num = parseInt(e.target.value, 10);
      if (!isNaN(num) && num > 0) {
        setValue(num);
      }
      setEditing(false);
    }
  };

  // --- Display notation view ---
  const renderNotation = () => {
    if (!value) return <span className="text-lg cursor-pointer">•</span>;

    // example logic
    const lines = Math.log2(value); // e.g., 4 => 2 lines, 2 => 1 line
    const dots = value; // show value number of dots under

    return (
      <div className="flex flex-col items-center">
        {/* Lines above */}
        <div className="flex flex-col">
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="w-4 border-t border-black" />
          ))}
        </div>

        {/* The number */}
        <span className="font-bold text-sm">{value}</span>

        {/* Dots under */}
        <div className="flex justify-center">
          {Array.from({ length: dots }).map((_, i) => (
            <span key={i} className="text-xs">
              •
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div onClick={handleClick} className="px-1">
      {editing ? (
        <input
          type="number"
          autoFocus
          onKeyDown={handleInput}
          onBlur={() => setEditing(false)}
          className="w-6 text-center border-b border-gray-400 text-xs"
        />
      ) : (
        renderNotation()
      )}
    </div>
  );
}

export default Dot;
