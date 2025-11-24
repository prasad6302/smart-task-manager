import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axiosClient.post("/auth/login/", form);
      login(res.data.access);
      navigate("/");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-indigo-800 to-purple-900 p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-10">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>

        {error && <p className="text-red-400 text-center mb-3 text-sm">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-lg font-semibold transition">
            Login
          </button>
        </form>

        <p className="text-gray-200 text-center mt-5 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-300 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
