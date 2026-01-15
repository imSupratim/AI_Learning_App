import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Upload, LogOut, LogIn, UserPlus, Brain, Menu, X, User } from "lucide-react";
import api from "../api/api";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("name");

  const handleLogout = async() => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      toast.success("Logged out");
      navigate("/login");

      setIsOpen(false);
    } catch (error) {}
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            onClick={closeMenu}
          >
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg p-1.5">
              <Brain className="w-5 h-5 text-white" />
            </div>
            Notely
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {userId ? (
              <>
                
                <span className="text-slate-600 text-sm font-bold">
                  Hi, <span className="font-semibold text-indigo-600">{userName.split(" ")[0]}</span>
                </span>

                <Link
                  to="/"
                  className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Link>

                <Link
                  to="/upload"
                  className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 border border-slate-300 px-4 py-2 rounded-lg hover:border-indigo-600 transition-colors font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-4 space-y-3">
            {userId ? (
              <>
                <div className="px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-100">
                  <p className="text-sm text-slate-600">
                    Hi, <span className="font-semibold text-indigo-600">{userName}</span>
                  </p>
                </div>

                <Link
                  to="/"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>

                <Link
                  to="/upload"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                >
                  <Upload className="w-5 h-5" />
                  Upload
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium"
                >
                  <UserPlus className="w-5 h-5" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;