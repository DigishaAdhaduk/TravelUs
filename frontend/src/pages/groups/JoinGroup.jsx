import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Search, Link } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { groupsAPI } from "../../services/api";

const JoinGroup = () => {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleJoinByCode = async () => {
    if (!inviteCode.trim()) {
      setError("Please enter an invite code");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await groupsAPI.joinGroup(inviteCode.trim());
      setSuccess("Successfully joined the group!");

      // Redirect to groups list after a short delay
      setTimeout(() => {
        navigate("/groups");
      }, 2000);
    } catch (error) {
      setError("Invalid invite code. Please check and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-travel-blue/5">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />

        <div className="flex-1 ml-64 p-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/groups")}
              className="flex items-center gap-2 text-travel-blue hover:text-travel-purple mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Groups
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-travel-blue/10 rounded-xl flex items-center justify-center">
                <Users className="text-travel-blue" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Join Group</h1>
                <p className="text-gray-600">
                  Join existing travel groups using an invite code
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-md">
            <div className="bg-white rounded-2xl shadow-sm border border-travel-blue/10 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Enter Invite Code
              </h3>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                  {success}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invite Code
                  </label>
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder=""
                    className="w-full px-4 py-3 border border-travel-blue/20 rounded-lg focus:ring-2 focus:ring-travel-blue focus:border-travel-blue"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Enter the invite code shared by your group organizer
                  </p>
                </div>

                <button
                  onClick={handleJoinByCode}
                  disabled={isLoading || !inviteCode.trim()}
                  className="w-full bg-travel-blue text-white px-6 py-3 rounded-lg hover:bg-travel-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Search size={20} />
                      Join Group
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinGroup;
