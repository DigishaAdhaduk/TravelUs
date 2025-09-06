import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getInitials, cn } from "@/lib/utils";
import PropTypes from "prop-types";

export default function Navbar({ onToggleSidebar, showMenuButton = true }) {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {showMenuButton && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleSidebar}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors md:hidden"
              >
                <Menu className="h-5 w-5" />
              </motion.button>
            )}

            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
                <img
                  src="https://cdn.builder.io/api/v1/assets/dfadf13641e64a01b7846f2c64f8a6bc/screenshot_2025-05-25_at_10.46.04_am-removebg-preview-bcec59?format=webp&width=200"
                  alt="TravelUs Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-display font-bold gradient-text hidden sm:block">
                TravelUs
              </span>
            </Link>
          </div>

          {/* Center - Search (hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder=""
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-travel-blue focus:ring-2 focus:ring-travel-blue/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search button (mobile) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors md:hidden"
            >
              <Search className="h-5 w-5" />
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-red-500 rounded-full"></span>
              </motion.button>

              {/* Notifications dropdown */}
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-large border border-gray-200 py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-4 py-8 text-center text-gray-500">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No notifications yet</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {getInitials(user?.name || "")}
                    </div>
                  )}
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">@{user?.username}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
                </div>
              </motion.button>

              {/* User dropdown */}
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-large border border-gray-200 py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(userMenuOpen || notificationsOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setUserMenuOpen(false);
            setNotificationsOpen(false);
          }}
        />
      )}
    </nav>
  );
}

Navbar.propTypes = {
  onToggleSidebar: PropTypes.func,
  showMenuButton: PropTypes.bool,
};
