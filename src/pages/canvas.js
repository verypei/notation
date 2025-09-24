import { useState } from "react";

export default function CanvasArea() {
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [timeSignature, setTimeSignature] = useState("4/4");
  const [tempo, setTempo] = useState(90);

  // ------------------ Handlers ------------------
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") setIsEditing(false);
  };
  const handleTitleClick = () => setIsEditing(true);
  const handleTimeSignatureChange = (e) => setTimeSignature(e.target.value);
  const handleTempoChange = (e) => setTempo(Number(e.target.value));

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-inner p-6">
      {/* Song Title */}
      <div className="flex justify-center mt-6">
        {isEditing ? (
          <input
            type="text"
            placeholder="Song Title"
            className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 text-lg p-1 w-64 text-center"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span
            className="text-lg font-semibold cursor-pointer"
            onClick={handleTitleClick}
          >
            {title || "Untitled Song"}
          </span>
        )}
      </div>

      {/* Time Signature + Tempo */}
      <div className="flex justify-between mt-10 px-2 ml-10">
        {/* Left: Time Signature */}
        <div>
          <label className="text-sm font-medium mr-2">Time Signature:</label>
          <select
            className="border border-gray-400 rounded p-2 text-lg focus:outline-none focus:border-blue-500"
            value={timeSignature}
            onChange={handleTimeSignatureChange}
          >
            <option value="4/4">4/4</option>
            <option value="3/4">3/4</option>
            <option value="6/8">6/8</option>
            <option value="2/4">2/4</option>
          </select>
        </div>

        {/* Right: Tempo */}
        <div>
          <label className="text-sm font-medium mr-2">Tempo (BPM):</label>
          <input
            type="number"
            className="border border-gray-400 rounded p-2 text-lg focus:outline-none focus:border-blue-500 w-24 text-center mr-10"
            value={tempo}
            onChange={handleTempoChange}
          />
        </div>
      </div>
    </div>
  );
}
