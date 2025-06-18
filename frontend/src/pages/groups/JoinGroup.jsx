import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinGroup() {
  const [groupCode, setGroupCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (groupCode.trim() === "") {
      setError("Please enter a valid group code");
      return;
    }
    // TODO: Replace with backend validation of code
    console.log("Joining group with code:", groupCode);
    navigate("/groups/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f8] text-[#192166]">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Join a Group</h2>
        <p className="text-gray-600 mb-4">Enter the invite code you received to join a travel group.</p>

        <input
          type="text"
          placeholder="Enter Group Code"
          value={groupCode}
          onChange={(e) => {
            setGroupCode(e.target.value);
            setError("");
          }}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#192166]"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleJoin}
          className="w-full bg-[#192166] text-white py-3 rounded-md hover:bg-[#101547] transition-colors"
        >
          Join Group
        </button>
      </div>
    </div>
  );
}
