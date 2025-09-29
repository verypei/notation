export default function SecondaryNotationBar({ numerator }) {
  return (
    <div className="flex items-center">
      {/* Dots + End Bar Line */}
      <div className="flex items-center">
        {/* Dots */}
        <div className="flex items-center space-x-3 gap-2">
          {" "}
          {/* Use space-x for consistent gap */}
          {Array.from({ length: numerator }).map((_, index) => (
            <div className="flex space-around">
              <span
                key={index}
                className="text-base leading-none font-normal" // match Primary Bar style
                style={{ fontSize: "1.25rem" }} // exactly match dot size
              >
                •
              </span>
            </div>
          ))}
        </div>

        {/* End Bar Line */}
        <span className="text-lg font-bold ml-4 -mr-3">|</span>
      </div>
    </div>
  );
}
