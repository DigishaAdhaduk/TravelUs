import React from "react";

export default function Navbar() {
  return (
    <div className="bg-white shadow px-6 py-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-[#192166]">TravelUs Dashboard</h2>
        <div className="flex items-center gap-4">
          {/* You can add profile info, notifications, etc. here */}
          <div className="text-sm text-gray-600">Hello, User</div>
        </div>
      </div>
    </div>
  );
}
