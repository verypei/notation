import { useState } from "react";

export default function CanvasArea() {
  // ------------------------------- USE STATE -------------------------------------

  const [title, setTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(true);

  // ------------------------------- FUNCTION -------------------------------------

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false); // switch to display mode
    }
  };

  const handleClick = () => {
    setIsEditingTitle(true); // switch back to input mode
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-inner">
      <div className="flex justify-center mt-10">
        {isEditingTitle ? (
          <input
            type="text"
            placeholder="Song Title"
            className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 text-lg p-1 w-64 text-center mt-10"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown} // detect Enter key
            autoFocus
          />
        ) : (
          <span
            className="text-lg font-semibold cursor-pointer mt-10"
            onClick={handleClick} // click to edit again
          >
            {title || "Untitled Song"}
          </span>
        )}
      </div>
    </div>
  );
}
