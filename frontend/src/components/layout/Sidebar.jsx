import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  UserPlus,
  Settings,
  X,
  TrendingUp,
  Calendar,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview and stats",
  },
  {
    name: "My Groups",
    href: "/groups",
    icon: Users,
    description: "Travel groups",
  },
  {
    name: "Create Group",
    href: "/groups/create",
    icon: PlusCircle,
    description: "Start new trip",
  },
  {
    name: "Join Group",
    href: "/groups/join",
    icon: UserPlus,
    description: "Join friends",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: TrendingUp,
    description: "Spending insights",
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
    description: "Trip schedule",
  },
  {
    name: "Documents",
    href: "/documents",
    icon: FileText,
    description: "Travel docs",
  },
];

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  closed: { y: 20, opacity: 0 },
};

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out",
          "md:relative md:translate-x-0 md:w-64 lg:w-72",
          "flex flex-col",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
              <img
                src="https://cdn.builder.io/api/v1/assets/dfadf13641e64a01b7846f2c64f8a6bc/screenshot_2025-05-25_at_10.46.04_am-removebg-preview-bcec59?format=webp&width=200"
                alt="TravelUs Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-display font-bold gradient-text">
              TravelUs
            </span>
          </Link>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors md:hidden"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <motion.div
            variants={{
              open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 },
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 },
              },
            }}
            className="space-y-1"
          >
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div key={item.name} variants={itemVariants}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      "nav-link group relative",
                      isActive && "active",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs opacity-70">{item.description}</p>
                      </div>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-travel-blue rounded-r-full"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="pt-6 mt-6 border-t border-gray-100"
          >
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/groups/create"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gradient-primary text-white shadow-medium hover:shadow-large transition-all duration-300"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className="font-medium">New Group</span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/groups/join"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                >
                  <UserPlus className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Join Group</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <Link
            to="/settings"
            onClick={onClose}
            className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <Settings className="h-5 w-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </motion.div>
    </>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
