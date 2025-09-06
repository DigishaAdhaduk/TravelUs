import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, LogOut, Menu, X, Plus, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white border-b border-travel-blue/10 fixed w-full top-0 z-40 shadow-sm">
      <div className="px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-travel-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">T</span>
              </div>
              <span className="font-bold text-xl text-travel-blue hidden sm:block group-hover:scale-105 transition-transform duration-300">
                TravelUs
              </span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-travel-blue/5 transition-colors border border-transparent hover:border-travel-blue/20"
              >
                <div className="w-8 h-8 bg-travel-blue rounded-full flex items-center justify-center shadow-sm">
                  <User className="text-white" size={16} />
                </div>
                <span className="hidden sm:block font-medium text-gray-700">
                  {user?.name || "User"}
                </span>
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">
                      {user?.name || "User Name"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      @{user?.username || "username"}
                    </p>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Home size={16} />
                      Dashboard
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 pt-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/groups"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                My Groups
              </Link>
              <Link
                to="/groups/create"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Create Group
              </Link>
              <Link
                to="/groups/join"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Join Group
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Overlay for dropdowns */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowUserMenu(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
