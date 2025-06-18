import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#f3f4f6]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* Page Content */}
        <div className="p-8 text-[#192166] overflow-auto">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-lg text-gray-700">
            Welcome back! Start planning your next trip or manage your groups and expenses below.
          </p>
        </div>
      </div>
    </div>
  );
}
