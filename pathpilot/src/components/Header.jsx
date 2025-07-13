export default function Header({ onMenuClick }) {
  return (
    <header className="w-full bg-white shadow-md py-4 px-6 fixed top-0 z-10 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">🎯 داشبورد PathPilot</h1>
      <button
        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded"
        onClick={onMenuClick}
      >
        باز کردن منو
      </button>
    </header>
  );
}
