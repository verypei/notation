export default function CustomNotationBar({
  numerator,
  denominator,
  repeat,
  sameBefore,
}) {
  return (
    <div className="flex items-center">
      {/* Start Bar Line */}
      {repeat ? (
        <div className="flex flex-col items-center -mr-3 leading-[0.7]"></div>
      ) : (
        <div className="flex flex-col items-center mr-2 leading-[0.7]">
          <span className="text-sm font-bold">{numerator}</span>
          <span className="text-sm font-bold">{denominator}</span>
        </div>
      )}
      {/* Custom Dots */}
      <div className="flex mx-1 gap-4">
        {Array.from({ length: numerator }).map((_, index) => (
          <span key={index} className="text-lg">
            •
          </span>
        ))}
      </div>

      {/* End Bar Line */}
      <span className="text-lg font-bold ml-2 -mr-4">|</span>
    </div>
  );
}
