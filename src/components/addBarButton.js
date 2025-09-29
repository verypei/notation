import { useState } from "react";

export default function AddBarButton({ onAddPrimary, onAddSecondary }) {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Main Plus Button */}
      <button
        onClick={toggleOptions}
        className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-blue-600 transition"
      >
        +
      </button>

      {/* Dropdown Menu */}
      {showOptions && (
        <div className="absolute top-12 left-0 bg-white border rounded shadow-md p-2 z-10">
          <button
            onClick={() => {
              onAddPrimary();
              setShowOptions(false);
            }}
            className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100 rounded"
          >
            ➕ Add Primary
          </button>
          <button
            onClick={() => {
              onAddSecondary();
              setShowOptions(false);
            }}
            className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100 rounded mt-1"
          >
            ➕ Add Secondary
          </button>
        </div>
      )}
    </div>
  );
}
