import "./App.css";
import Sidebar from "./components/sidebar";
import CanvasArea from "./pages/canvas_konva";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6">
        <CanvasArea />
      </div>
    </div>
  );
}

export default App;
