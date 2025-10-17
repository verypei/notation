import { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Group, Text } from "react-konva";
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

  const [barCount, setBarCount] = useState([
    {
      type: "primary",
      numerator: parseInt(numerator),
      denominator: parseInt(denominator),
    },
  ]); // 🔸 jumlah bar

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

  // 🟢 Tombol kontrol bar
  const handleAddBar = () => {
    setBarCount((prev) => prev + 1);
  };

  const handleRemoveBar = () => {
    setBarCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

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

  const spacing = 25;
  const barLength = parseInt(numerator) * spacing + 50;
  const barStartX = 50;
  const y = 200;

  return (
    <div ref={containerRef} style={wrapperStyle}>
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

            {/* 🟡 Render semua bar berdasarkan barCount */}
            {barCount.map((bar, i) => (
              <PrimaryBar
                key={i}
                x={barStartX + i * barLength}
                y={y}
                numerator={bar.numerator}
                denominator={bar.denominator}
              />
            ))}

            {/* 🟢 Tombol + dan - */}
            <Group x={barStartX + barCount.length * barLength + 10} y={y - 15}>
              <Rect
                width={13}
                height={13}
                fill="#4caf50"
                cornerRadius={4}
                onClick={handleAddBar}
              />
              <Text
                text="+"
                fontSize={10}
                fill="white"
                align="center"
                width={13}
                height={13}
                verticalAlign="middle"
              />
            </Group>

            <Group x={barStartX + barCount.length * barLength + 10} y={y + 2}>
              <Rect
                width={13}
                height={13}
                fill="#f44336"
                cornerRadius={4}
                onClick={handleRemoveBar}
              />
              <Text
                text="-"
                fontSize={18}
                fill="white"
                align="center"
                width={13}
                height={13}
                verticalAlign="middle"
              />
            </Group>
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
