export default function PrimaryNotationBar({ numerator, denominator, repeat }) {
  console.log("masuk ke primary---", numerator, denominator, "==--->", repeat);

  return (
    <div className="flex items-center">
      {/* Start Bar Line */}
      {!repeat ? (
        <span className="text-lg font-bold mr-3">||</span>
      ) : (
        <span className="text-lg font-bold -mr-2"></span>
      )}

      {/* Time Signature stacked vertically */}
      <div className="flex flex-col items-center mr-4 leading-[0.7]">
        <span className="text-sm font-bold">{numerator}</span>
        <span className="text-sm font-bold">{denominator}</span>
      </div>

      {/* Dots based on numerator */}
      <div
        className="flex justify-between"
        style={{ width: `${numerator * 24}px` }}
      >
        {Array.from({ length: numerator }).map((_, index) => (
          <span key={index} className="text-lg">
            •
          </span>
        ))}
      </div>

      {/* End Bar Line */}
      <span className="text-lg font-bold ml-3 -mr-6">|</span>
    </div>
  );
}
