const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Welcome Back 👋
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button className="w-full bg-blue-500 py-2 rounded-lg hover:bg-blue-600 transition">
          Login
        </button>

        <p className="text-sm mt-4 text-center text-gray-300">
          Don’t have an account? Sign up
        </p>
      </div>
    </div>
  );
};

export default Login;