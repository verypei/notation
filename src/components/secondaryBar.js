export default function SecondaryNotationBar({ numerator }) {
  return (
    <div className="flex items-center">
      {/* Dots + Bar Lines */}
      <div className="flex items-center space-x-3 gap-2 -mr-5">
        {/* Start Bar Line */}

        {/* Dots */}
        {Array.from({ length: numerator }).map((_, index) => (
          <span
            key={index}
            className="text-base leading-none font-normal"
            style={{ fontSize: "1.25rem" }}
          >
            •
          </span>
        ))}

        {/* End Bar Line */}
        <span className="text-lg font-bold ml-4 -mr-4">|</span>
      </div>
    </div>
  );
}
