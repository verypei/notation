import { useState } from "react";
import PrimaryNotationBar from "../components/primaryBar";

export default function CanvasArea() {
  const [title, setTitle] = useState("");
  const [isTitleEditing, setisEditingTitle] = useState(true);

  const [numerator, setNumerator] = useState(4);
  const [isEditingNumerator, setIsEditingNumerator] = useState(true);

  const [denominator, setDenominator] = useState(4);
  const [isEditingDenominator, setIsEditingDenominator] = useState(true);

  const [tempo, setTempo] = useState(90);

  // ------------------ Handlers ------------------
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setisEditingTitle(false);
      setIsEditingNumerator(false);
    }
  };
  const handleTitleClick = () => setisEditingTitle(true);

  const handleNumeratorChange = (e) => {
    setNumerator(+e.target.value);
  };
  const handleNumeratorClick = () => setIsEditingNumerator(true);

  const handleDenominatorChange = (e) => {
    setDenominator(+e.target.value);
  };
  const handleDenominatorClick = () => setIsEditingDenominator(true);

  const handleTempoChange = (e) => setTempo(Number(e.target.value));

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-inner p-6">
      {/* Song Title */}
      <div className="flex justify-center mt-6">
        {isTitleEditing ? (
          <input
            type="text"
            placeholder="Song Title"
            className="font-pinyon border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 text-5xl p-1 w-64 text-center"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span
            className="font-pinyon text-5xl font-semibold cursor-pointer"
            onClick={handleTitleClick}
          >
            {title || "Untitled Song"}
          </span>
        )}
      </div>

      {/* numerator + denominator + Tempo */}
      <div className="flex justify-between items-center gap-x-[5px] mt-10 px-2 ml-10">
        <div>
          {/* ----------Numerator-------------- */}
          <label className="text-lg font-medium mr-2">numerator :</label>
          {isEditingNumerator ? (
            <input
              type="text"
              placeholder=""
              className="border-0 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 text-lg px-1 w-10 text-center bg-transparent"
              value={numerator}
              onChange={handleNumeratorChange}
              onKeyDown={handleKeyDown}
              min={2}
              autoFocus
            />
          ) : (
            <span
              className="inline-block text-lg font-semibold cursor-pointer border-b-2 border-gray-400 px-1 w-10 text-center"
              onClick={handleNumeratorClick}
            >
              {numerator}
            </span>
          )}
          {/* --------denominator--------- */}
          <label className="text-lg font-medium mr-2 pl-5">denominator :</label>
          {isEditingDenominator ? (
            <input
              type="text"
              placeholder=""
              className="border-0 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 text-lg px-1 w-10 text-center bg-transparent"
              value={denominator}
              onChange={handleDenominatorChange}
              onKeyDown={handleKeyDown}
              min={2}
              autoFocus
            />
          ) : (
            <span
              className="inline-block text-lg font-semibold cursor-pointer border-b-2 border-gray-400 px-1 w-10 text-center"
              onClick={handleDenominatorClick}
            >
              {denominator}
            </span>
          )}
        </div>
        <div className="flex items-center">
          <label className="text-sm font-medium mr-2">Tempo (BPM) :</label>
          <input
            type="number"
            className="border border-gray-400 rounded p-2 text-lg focus:outline-none focus:border-blue-500 w-24 text-center mr-10"
            value={tempo}
            min={10}
            max={200}
            onChange={handleTempoChange}
          />
        </div>
      </div>
      {/* ---------------notation bar------------- */}
      <div className="mt-10 ml-12">
        <PrimaryNotationBar numerator={numerator} denominator={denominator} />
      </div>
    </div>
  );
}
