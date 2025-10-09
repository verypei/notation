import { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import CanvasTitle from "../components/title";
import CanvasTimeSignature from "../components/timeSignature";
import KeyNoteSelector from "../components/keyNote";
import TempoInput from "../components/tempoInput";
import PrimaryBar from "../components/primaryBar";

export default function A4Canvas({
  dpi = 96,
  orientation = "portrait",
  fit = true,
}) {
  // State untuk judul, tanda birama, tempo, dan nada dasar----------------
  const [title, setTitle] = useState("");
  const [numerator, setNumerator] = useState("4");
  const [denominator, setDenominator] = useState("4");
  const [tempo, setTempo] = useState("");
  const [tonic, setTonic] = useState("");

  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;
  const mmToPx = (mm) => (mm / 25.4) * dpi;

  const [paperPx, setPaperPx] = useState(() => {
    const w = mmToPx(A4_WIDTH_MM);
    const h = mmToPx(A4_HEIGHT_MM);
    return orientation === "portrait"
      ? { width: w, height: h }
      : { width: h, height: w };
  });

  const containerRef = useRef(null);
  const [stageScale, setStageScale] = useState(1);
  const [stageSize, setStageSize] = useState(paperPx);

  useEffect(() => {
    const w = mmToPx(A4_WIDTH_MM);
    const h = mmToPx(A4_HEIGHT_MM);
    const px =
      orientation === "portrait"
        ? { width: w, height: h }
        : { width: h, height: w };

    setPaperPx(px);
    setStageSize(px);
  }, [dpi, orientation]);

  useEffect(() => {
    if (!fit) {
      setStageScale(1);
      return;
    }
    const onResize = () => {
      const parent = containerRef.current;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      const padding = 24;
      const maxW = Math.max(100, parentRect.width - padding);
      const maxH = Math.max(100, parentRect.height - padding);
      const scale = Math.min(maxW / paperPx.width, maxH / paperPx.height, 1);
      setStageScale(scale);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paperPx, fit]);

  const wrapperStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    boxSizing: "border-box",
  };

  return (
    <div ref={containerRef} style={wrapperStyle}>
      {/* Title input overlay */}
      <CanvasTitle
        title={title}
        setTitle={setTitle}
        stageScale={stageScale}
        stageSize={stageSize}
      />
      <CanvasTimeSignature
        numerator={numerator}
        setNumerator={setNumerator}
        denominator={denominator}
        setDenominator={setDenominator}
        stageScale={stageScale}
        stageSize={stageSize}
      />
      <KeyNoteSelector
        stageScale={stageScale}
        tonic={tonic}
        setTonic={setTonic}
      />
      <TempoInput stageScale={stageScale} tempo={tempo} setTempo={setTempo} />

      {/* Canvas paper */}
      <div
        style={{
          width: Math.round(stageSize.width * stageScale),
          height: Math.round(stageSize.height * stageScale),
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          background: "#fff",
          borderRadius: 4,
        }}
      >
        <Stage
          width={Math.round(stageSize.width)}
          height={Math.round(stageSize.height)}
          scaleX={stageScale}
          scaleY={stageScale}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={stageSize.width}
              height={stageSize.height}
              fill="#ffffff"
              stroke="#d1d5db"
              strokeWidth={1.5}
            />
            <PrimaryBar
              x={50}
              y={200}
              numerator={numerator}
              denominator={denominator}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
