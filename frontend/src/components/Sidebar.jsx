import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, FileText, MessageCircle, DollarSign, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-[#192166] text-white flex flex-col p-6 space-y-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-6 tracking-wide">TravelUs</h1>

      <nav className="flex flex-col gap-4 text-sm font-medium">
        <Link to="/dashboard" className="flex items-center gap-2 hover:text-gray-300">
          <Home size={18} /> Dashboard
        </Link>
        <Link to="/groups" className="flex items-center gap-2 hover:text-gray-300">
          <Users size={18} /> My Groups
        </Link>
        <Link to="/groups/create" className="hover:text-yellow-300 flex items-center gap-2">
          <Plus size={18} /> Create Group
        </Link>
        <Link to="/documents" className="flex items-center gap-2 hover:text-gray-300">
          <FileText size={18} /> Documents
        </Link>
        <Link to="/chat" className="flex items-center gap-2 hover:text-gray-300">
          <MessageCircle size={18} /> Chat
        </Link>
        <Link to="/expenses" className="flex items-center gap-2 hover:text-gray-300">
          <DollarSign size={18} /> Expenses
        </Link>
        <Link to="/logout" className="hover:text-red-400 flex items-center gap-2 mt-8">
          <LogOut size={18} /> Logout
        </Link>
      </nav>
    </div>
  );
}