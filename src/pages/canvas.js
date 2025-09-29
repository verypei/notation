import { useEffect, useRef, useState } from "react";
import PrimaryNotationBar from "../components/primaryBar";
import SecondaryNotationBar from "../components/secondaryBar";
import CustomNotationBar from "../components/customBar";

export default function CanvasArea() {
  // ------------------ Use State ------------------

  const [title, setTitle] = useState("");
  const [isTitleEditing, setisEditingTitle] = useState(true);

  const [numerator, setNumerator] = useState(4);
  const [isEditingNumerator, setIsEditingNumerator] = useState(true);

  const [denominator, setDenominator] = useState(4);
  const [isEditingDenominator, setIsEditingDenominator] = useState(true);

  const [tempo, setTempo] = useState(90);

  const [bars, setBars] = useState([]);

  const [positions, setPositions] = useState([]);

  // ------------------ Use Ref ------------------

  const containerRef = useRef(null);
  const barRefs = useRef([]);

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

  const handleAddBar = (type) => {
    if (type === "custom") {
      const customNum = prompt("Enter custom numerator:", numerator);
      if (!customNum || isNaN(customNum) || customNum <= 0) return;
      setBars([
        ...bars,
        { type: "custom", numerator: parseInt(customNum, 10) },
      ]);
    } else {
      setBars([...bars, { type: "secondary" }]);
    }
  };

  const handleDeleteBar = () => {
    setBars((prevBars) => prevBars.slice(0, -1));
  };

  const isNewLine = (index) => {
    if (index === 0) return false; // First bar never has a leading |

    const currentTop = barRefs.current[index]?.offsetTop;
    const prevTop = barRefs.current[index - 1]?.offsetTop;

    return currentTop !== prevTop;
  };

  // ------------------ Use Effect ------------------
  useEffect(() => {
    if (!containerRef.current) return;
    const children = containerRef.current.querySelectorAll(".bar-item");
    const newPositions = Array.from(children).map((el) => el.offsetTop);
    setPositions(newPositions);
  }, [bars]);

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
      <div className="w-full h-full bg-white rounded-lg shadow-inner p-6">
        <div
          ref={containerRef}
          className="flex flex-wrap items-center gap-x-8 gap-y-6"
        >
          {/* Fixed primary bar at the very start */}
          <PrimaryNotationBar numerator={numerator} denominator={denominator} />

          {/* Render all dynamic bars */}
          {bars.map((bar, index) => {
            return (
              <div
                key={index}
                ref={(el) => (barRefs.current[index] = el)} // Track position
                className="bar-item flex items-center"
              >
                <span
                  className={`text-lg font-bold ${
                    isNewLine(index) ? "ml-2 mr-5" : "mr-2"
                  }`}
                >
                  {isNewLine(index) ? "|" : ""}
                </span>

                {bar.type === "secondary" ? (
                  <SecondaryNotationBar numerator={numerator} />
                ) : (
                  <CustomNotationBar numerator={bar.numerator} denominator={denominator} />
                )}
              </div>
            );
          })}

          {/* + Button */}
          <div className="relative group flex flex-col items-center gap-2">
            {/* Delete button */}
            <button
              onClick={handleDeleteBar} // <-- Your delete logic here
              className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-lg font-bold hover:bg-red-600"
            >
              -
            </button>

            {/* Add button */}
            <button className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold hover:bg-blue-600">
              +
            </button>

            {/* Dropdown menu */}
            <div className="absolute top-12 left-0 bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button
                onClick={() => handleAddBar("secondary")}
                className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                Add Secondary
              </button>
              <button
                onClick={() => handleAddBar("custom")}
                className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                Add Custom
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
