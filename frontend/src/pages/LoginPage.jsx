import React from "react";
import AuthPageDesign from "../components/AuthPageDesign";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, LogIn, Sparkles, BookOpen, AlertCircle, User } from "lucide-react";
import api from "../api/api";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("name", res.data.name);
      toast.success("Logged in successfully")
    //    window.location.reload();
      navigate("/"); // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error("Login failed")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left: Form */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-6">
  <div className="w-full max-w-md">
    {/* Header */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl mb-4">
        <User className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Welcome Back 👋
      </h1>
      <p className="text-slate-600">
        Login to continue learning
      </p>
    </div>

    {/* Login Card */}
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg 
                       focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg 
                       focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-colors
                     ${loading 
                       ? 'bg-slate-400 cursor-not-allowed' 
                       : 'bg-indigo-600 hover:bg-indigo-700'
                     }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Logging in...
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              Login
            </>
          )}
        </button>
      </form>

      {/* Register Link */}
      <p className="text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-indigo-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  </div>
</div>

      {/* Right design */}

      <AuthPageDesign tag="Login and start learning.." />
    </div>
  );
};

export default LoginPage;
