export default function KeyNoteSelector({ tonic, setTonic, stageScale = 1 }) {
  // Nada dasar umum (Do) — bisa diperluas sesuai kebutuhan
  const tonicOptions = [
    "C",
    "C# / Db",
    "D",
    "D# / Eb",
    "E",
    "F",
    "F# / Gb",
    "G",
    "G# / Ab",
    "A",
    "A# / Bb",
    "B",
  ];

  const handleChange = (e) => {
    setTonic(e.target.value);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 90 * stageScale, // posisinya di atas time signature
        right: 250 * stageScale,
        display: "flex",
        alignItems: "center",
        gap: `${8 * stageScale}px`,
        zIndex: 10,
      }}
    >
      <label
        style={{
          fontSize: `${12 * stageScale}px`,
          fontWeight: "bold",
        }}
      >
        Do =
      </label>

      <select
        value={tonic}
        onChange={handleChange}
        style={{
          fontSize: `${12 * stageScale}px`,
          padding: `${4 * stageScale}px ${8 * stageScale}px`,
          borderRadius: "4px",
          border: "1px solid #ccc",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        <option value="">Pilih nada dasar</option>
        {tonicOptions.map((note) => (
          <option key={note} value={note}>
            {note}
          </option>
        ))}
      </select>
    </div>
  );
}
