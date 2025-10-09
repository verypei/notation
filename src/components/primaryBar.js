import { useEffect, useState } from "react";
import { Group, Line, Text, Circle } from "react-konva";

export default function PrimaryBar({
  x = 50,
  y = 200,
  numerator = 4,
  denominator = 4,
  spacing = 40,
  marginRight = 50,
}) {
  const dotSpacing = 40; // jarak antar titik
  const lineHeight = 30; // tinggi bar
  const barStartX = x;

  const [barConfig, setBarConfig] = useState({
    startX: x,
    endX: x + numerator * spacing + marginRight,
    dots: [],
  });

  const barEndX = x + numerator * dotSpacing + 50;

  useEffect(() => {
    // Recalculate bar when numerator or denominator change
    const startX = x;
    const endX = x + numerator * spacing + marginRight;
    const dots = Array.from({ length: numerator }).map((_, i) => ({
      x: startX + 60 + i * spacing,
      y: y,
    }));

    setBarConfig({ startX, endX, dots });
  }, [numerator, denominator, x, y, spacing, marginRight]);

  return (
    <Group x={0} y={0}>
      {/* Double Bar Start || */}
      <Line
        points={[barStartX, y - lineHeight / 2, barStartX, y + lineHeight / 2]}
        stroke="black"
        strokeWidth={2}
      />
      <Line
        points={[
          barStartX + 6,
          y - lineHeight / 2,
          barStartX + 6,
          y + lineHeight / 2,
        ]}
        stroke="black"
        strokeWidth={2}
      />

      {/* Time Signature */}
      <Text
        x={barStartX + 15}
        y={y - 20}
        text={numerator.toString()}
        fontSize={15}
        align="center"
        width={20}
      />
      <Text
        x={barStartX + 15}
        y={y}
        text={denominator.toString()}
        fontSize={15}
        align="center"
        width={20}
      />

      {/* Dots (based on numerator) */}
      {Array.from({ length: numerator }).map((_, i) => {
        const cx = barStartX + 60 + i * dotSpacing;
        return <Circle key={i} x={cx} y={y} radius={4} fill="black" />;
      })}

      {/* Single Bar End | */}
      <Line
        points={[barEndX, y - lineHeight / 2, barEndX, y + lineHeight / 2]}
        stroke="black"
        strokeWidth={2}
      />
    </Group>
  );
}
