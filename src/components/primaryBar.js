export default function PrimaryNotationBar({
  numerator,
  denominator,
  repeat,
  numDisplay,
}) {
  return (
    <div className="flex items-center">
      {!repeat && numDisplay && (
        <span className="text-lg font-bold mr-2 ml-2">||</span>
      )}
      {repeat && numDisplay && (
        <span className="text-lg font-bold -mr-2"></span>
      )}

      {numDisplay && (
        <div className="flex flex-col items-center leading-[0.7]">
          <span className="text-sm font-bold">{numerator}</span>
          <span className="text-sm font-bold">{denominator}</span>
        </div>
      )}
      {
        <div className="flex flex-col items-center mr-2 ml-1 leading-[0.7]"></div>
      }
      {/* Dots based on numerator */}
      <div
        className="flex justify-between"
        style={{
          width: `${numerator * 24}px`,
          marginRight: numDisplay ? "8px" : "16px",
          marginLeft: numDisplay ? "0px" : "8px",
        }}
      >
        {Array.from({ length: numerator }).map((_, index) => (
          <span key={index} className="text-lg">
            •
          </span>
        ))}
      </div>

      {/* End Bar Line */}
      <span className="text-lg font-bold ml-3 -mr-9">|</span>
    </div>
  );
}
