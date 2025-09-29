export default function PrimaryNotationBar({ numerator, denominator }) {
  return (
    <div className="flex items-center">
      {/* Start Bar Line */}
      <span className="text-lg font-bold mr-1">||</span>

      {/* Time Signature stacked vertically */}
      <div className="flex flex-col items-center mr-2 leading-[0.7]">
        <span className="text-sm font-bold">{numerator}</span>
        <span className="text-sm font-bold">{denominator}</span>
      </div>

      {/* Dots based on numerator */}
      <div className="flex justify-between w-24 gap-2">
        {Array.from({ length: numerator }).map((_, index) => (
          <span key={index} className="text-lg">
            •
          </span>
        ))}
      </div>

      {/* End Bar Line */}
      <span className="text-lg font-bold ml-4 -mr-4">|</span>
    </div>
  );
}
