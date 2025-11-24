import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axiosClient.post("/auth/register/", form);
      navigate("/login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-700 via-purple-700 to-indigo-900 p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-10">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Create Account</h1>

        {error && <p className="text-red-300 text-center mb-3 text-sm">{error}</p>}

        <form className="space-y-4" onSubmit={submit}>
          <input
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg text-lg font-semibold transition">
            Register
          </button>
        </form>

        <p className="text-gray-200 text-center mt-5 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
