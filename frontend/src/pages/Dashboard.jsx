import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Users,
  Receipt,
  ArrowRight,
  MessageCircle,
  FileText,
  IndianRupee,
  UserPlus,
  BarChart3,
  CreditCard,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { groupsAPI } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [myGroups, setMyGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      // Using GROUP_API.MY_GROUPS - GET /groups/my to fetch user's groups
      const groups = await groupsAPI.getMyGroups();
      setMyGroups(groups);
    } catch (error) {
      console.error("Error loading groups:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-travel-blue/5">
        <Navbar />
        <div className="flex pt-16">
          <Sidebar />
          <div className="flex-1 ml-64 p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-travel-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-travel-blue/70">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-travel-blue/5">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />

        <div className="flex-1 ml-64 p-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name || "User"}!
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your travel groups and expenses
            </p>
          </div>

          {/* Feature Sections */}
          <div className="space-y-8 mb-8">
            {/* Group Management */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Group Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate("/groups/create")}
                  className="p-4 bg-white rounded-xl shadow-sm border border-travel-blue/10 hover:border-travel-blue hover:bg-travel-blue/5 transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-travel-blue rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Plus className="text-white" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-travel-blue transition-colors">
                    Create Group
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">Start new trip</p>
                </button>

                <button
                  onClick={() => navigate("/groups/join")}
                  className="p-4 bg-white rounded-xl shadow-sm border border-travel-blue/10 hover:border-travel-blue hover:bg-travel-blue/5 transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-travel-blue rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UserPlus className="text-white" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-travel-blue transition-colors">
                    Join Group
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">Join existing</p>
                </button>

                <button
                  onClick={() => navigate("/groups")}
                  className="p-4 bg-white rounded-xl shadow-sm border border-travel-blue/10 hover:border-travel-blue hover:bg-travel-blue/5 transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-travel-blue rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Users className="text-white" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-travel-blue transition-colors">
                    My Groups
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">View all groups</p>
                </button>

                {myGroups.length > 0 && (
                  <button
                    onClick={() =>
                      navigate(`/groups/${myGroups[0].groupId}/chat`)
                    }
                    className="p-4 bg-white rounded-xl shadow-sm border border-travel-blue/10 hover:border-travel-blue hover:bg-travel-blue/5 transition-all text-left group"
                  >
                    <div className="w-10 h-10 bg-travel-blue rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <MessageCircle className="text-white" size={20} />
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-travel-blue transition-colors">
                      Group Chat
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">Recent group</p>
                  </button>
                )}
              </div>
            </div>

            {/* Expense Tools */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Expense Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate("/expenses/add")}
                  className="p-4 bg-white rounded-xl shadow-sm border border-travel-blue/10 hover:border-travel-blue hover:bg-travel-blue/5 transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-travel-blue rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Receipt className="text-white" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-travel-blue transition-colors">
                    Add Expense
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">Record spending</p>
                </button>

                {myGroups.length > 0 && (
                  <>
                    <button
                      onClick={() =>
                        navigate(`/groups/${myGroups[0].groupId}/expenses`)
                      }
                      className="p-4 bg-white rounded-xl shadow-sm border border-travel-blue/10 hover:border-travel-blue hover:bg-travel-blue/5 transition-all text-left group"
                    >
                      <div className="w-10 h-10 bg-travel-blue rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <BarChart3 className="text-white" size={20} />
                      </div>
                      <h3 className="font-medium text-gray-900 group-hover:text-travel-blue transition-colors">
                        View Expenses
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Track spending
                      </p>
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/groups/${myGroups[0].groupId}/expenses`)
                      }
                      className="p-4 bg-white rounded-xl shadow-sm border border-travel-blue/10 hover:border-travel-blue hover:bg-travel-blue/5 transition-all text-left group"
                    >
                      <div className="w-10 h-10 bg-travel-blue rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <CreditCard className="text-white" size={20} />
                      </div>
                      <h3 className="font-medium text-gray-900 group-hover:text-travel-blue transition-colors">
                        Settle Up
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Balance debts
                      </p>
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/groups/${myGroups[0].groupId}/documents`)
                      }
                      className="p-4 bg-white rounded-xl shadow-sm border border-travel-blue/10 hover:border-travel-blue hover:bg-travel-blue/5 transition-all text-left group"
                    >
                      <div className="w-10 h-10 bg-travel-blue rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <FileText className="text-white" size={20} />
                      </div>
                      <h3 className="font-medium text-gray-900 group-hover:text-travel-blue transition-colors">
                        Documents
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">Manage files</p>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* My Groups */}
          <div className="bg-white rounded-2xl shadow-sm border border-travel-blue/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Groups</h2>
              <button
                onClick={() => navigate("/groups")}
                className="text-travel-blue hover:text-travel-purple font-medium flex items-center gap-1"
              >
                View All
                <ArrowRight size={16} />
              </button>
            </div>

            {myGroups.length === 0 ? (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No groups yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Create or join a travel group to get started
                </p>
                <div className="flex items-center gap-3 justify-center">
                  <button
                    onClick={() => navigate("/groups/create")}
                    className="bg-travel-blue text-white px-4 py-2 rounded-lg hover:bg-travel-purple transition-colors"
                  >
                    Create Group
                  </button>
                  <button
                    onClick={() => navigate("/groups/join")}
                    className="border border-travel-blue text-travel-blue px-4 py-2 rounded-lg hover:bg-travel-blue/5 transition-colors"
                  >
                    Join Group
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {myGroups.map((group) => (
                  <div
                    key={group.groupId}
                    className="p-4 border border-travel-blue/20 rounded-xl hover:border-travel-blue hover:bg-travel-blue/5 transition-all cursor-pointer group"
                    onClick={() => navigate(`/groups/${group.groupId}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-travel-blue transition-colors">
                          {group.groupName}
                        </h3>
                        <div className="text-sm text-gray-600 mt-1">
                          <span>{group.members.length} members</span>
                          {group.adminUsername === user?.username && (
                            <span className="ml-2 text-travel-blue font-medium">
                              • Admin
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight
                        className="text-gray-400 group-hover:text-travel-blue transition-colors"
                        size={20}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
