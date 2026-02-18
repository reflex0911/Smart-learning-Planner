import { Link } from "react-router-dom";

export default function Home() {
  return (
<div className="min-h-screen pt-24 bg-gradient-to-br from-purple-900 via-black to-blue-900 flex items-center justify-center px-6">      
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 text-center text-white max-w-xl w-full">
        
        <h1 className="text-4xl font-bold mb-4">
          Smart Learning Planner 🚀
        </h1>

        <p className="text-gray-300 mb-8">
          Organize your study. Track your growth. Become unstoppable.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/login">
            <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-xl transition">
              Login
            </button>
          </Link>

          <Link to="/dashboard">
            <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl transition">
              Dashboard
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}