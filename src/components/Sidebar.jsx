import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Home,
  Users,
  Plus,
  Receipt,
  UserPlus,
  FileText,
  MessageCircle,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const mainMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      id: "groups",
      label: "My Groups",
      icon: Users,
      path: "/groups",
    },
  ];

  const groupActions = [
    {
      id: "create-group",
      label: "Create Group",
      icon: Plus,
      path: "/groups/create",
    },
    {
      id: "join-group",
      label: "Join Group",
      icon: UserPlus,
      path: "/groups/join",
    },
    {
      id: "add-expense",
      label: "Add Expense",
      icon: Receipt,
      path: "/expenses/add",
    },
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-travel-blue/10 z-30 shadow-sm">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-6">
          {/* Main Navigation */}
          <div className="px-6 mb-6">
            <nav className="space-y-2">
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-travel-blue text-white shadow-md"
                        : "text-gray-700 hover:bg-travel-blue/5 hover:text-travel-blue"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Actions */}
          <div className="px-6 mb-6">
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-travel-blue uppercase tracking-wider">
                Quick Actions
              </h3>
            </div>
            <nav className="space-y-2">
              {groupActions.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-travel-blue text-white shadow-md"
                        : "text-gray-700 hover:bg-travel-blue/5 hover:text-travel-blue"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
