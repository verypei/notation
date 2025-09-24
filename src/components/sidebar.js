export default function Sidebar() {
  return (
    <div className="h-screen w-56 bg-gray-900 text-white flex flex-col p-4">
      <button className="mb-3 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">
        Create
      </button>
      <button className="mb-3 px-4 py-2 bg-green-600 rounded hover:bg-green-500">
        Render
      </button>
      <button className="mb-3 px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-500">
        Share
      </button>
      <button className="mb-3 px-4 py-2 bg-red-600 rounded hover:bg-red-500">
        Export
      </button>
    </div>
  );
}
