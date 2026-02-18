import { Link } from "react-router-dom";

export default function Navbar({ theme, setTheme }) {

  const themes = [
    {
      name: "purple",
      label: "Purple",
      gradient: "from-indigo-900 via-purple-800 to-blue-900"
    },
    {
      name: "obsidian",
      label: "Obsidian",
      gradient: "from-black via-gray-900 to-black"
    },
    {
      name: "cyber",
      label: "Cyber",
      gradient: "from-black via-cyan-900 to-black"
    }
  ];

  return (
    <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 px-8 py-4 flex justify-between items-center fixed w-full top-0 z-50">
      
      <h1 className="text-xl font-bold text-green-400">
        SmartPlanner
      </h1>

      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>

        {/* 🎨 Theme selector */}
        <div className="relative ml-6">
          <select
            value={theme}
            onChange={(e)=>setTheme(e.target.value)}
            className="p-2 pl-10 rounded-lg bg-white/20 border border-white/20 backdrop-blur text-white"
          >
            {themes.map(t => (
              <option key={t.name} value={t.name}>
                {t.label}
              </option>
            ))}
          </select>

          {/* circle preview */}
          <div className="absolute left-2 top-2 flex gap-2">
            {themes.map(t => (
              theme === t.name && (
                <div
                  key={t.name}
                  className={`w-5 h-5 rounded-full bg-gradient-to-br ${t.gradient}`}
                />
              )
            ))}
          </div>
        </div>

      </div>
    </nav>
  );
}