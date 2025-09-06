import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Users, UserPlus, ArrowRight, Crown } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { groupsAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const GroupList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      setIsLoading(true);
      // Using GROUP_API.MY_GROUPS - GET /groups/my to load all user's travel groups
      const data = await groupsAPI.getMyGroups();
      setGroups(data);
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
              <p className="text-travel-blue/70">Loading groups...</p>
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
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Groups</h1>
                <p className="text-gray-600 mt-1">
                  Manage your travel groups and plan amazing trips
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/groups/join")}
                  className="flex items-center gap-2 px-4 py-2 border border-travel-blue/20 text-travel-blue rounded-lg hover:bg-travel-blue/5 transition-colors"
                >
                  <UserPlus size={18} />
                  Join Group
                </button>
                <button
                  onClick={() => navigate("/groups/create")}
                  className="flex items-center gap-2 bg-travel-blue text-white px-6 py-2 rounded-lg hover:bg-travel-purple transition-colors"
                >
                  <Plus size={18} />
                  Create Group
                </button>
              </div>
            </div>
          </div>

          {/* Groups Grid */}
          {groups.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No groups yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create or join a travel group to get started
              </p>
              <div className="flex items-center gap-3 justify-center">
                <button
                  onClick={() => navigate("/groups/join")}
                  className="flex items-center gap-2 px-4 py-2 border border-travel-blue/20 text-travel-blue rounded-lg hover:bg-travel-blue/5 transition-colors"
                >
                  <UserPlus size={18} />
                  Join Group
                </button>
                <button
                  onClick={() => navigate("/groups/create")}
                  className="flex items-center gap-2 bg-travel-blue text-white px-6 py-2 rounded-lg hover:bg-travel-purple transition-colors"
                >
                  <Plus size={18} />
                  Create Group
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <div
                  key={group.groupId}
                  className="bg-white rounded-2xl shadow-sm border border-travel-blue/10 hover:border-travel-blue hover:shadow-md transition-all duration-200 cursor-pointer group"
                  onClick={() => navigate(`/groups/${group.groupId}`)}
                >
                  <div className="p-6">
                    {/* Group Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-travel-blue transition-colors">
                          {group.groupName}
                        </h3>
                        {group.adminUsername === user?.username && (
                          <div className="flex items-center gap-1 mt-1">
                            <Crown className="text-yellow-500" size={14} />
                            <span className="text-xs text-yellow-600 font-medium">
                              Admin
                            </span>
                          </div>
                        )}
                      </div>
                      <ArrowRight
                        className="text-gray-400 group-hover:text-travel-blue transition-colors"
                        size={20}
                      />
                    </div>

                    {/* Group Stats */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users size={16} />
                        <span>{group.members.length} members</span>
                      </div>

                      {/* Members Preview */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Members:</span>
                        <div className="flex items-center gap-1">
                          {group.members.slice(0, 3).map((member, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 bg-travel-blue/10 rounded-full flex items-center justify-center text-xs font-medium text-travel-blue"
                            >
                              {member.charAt(0).toUpperCase()}
                            </div>
                          ))}
                          {group.members.length > 3 && (
                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                              +{group.members.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/groups/${group.groupId}`);
                        }}
                        className="w-full text-travel-blue hover:text-travel-purple font-medium text-sm transition-colors"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupList;
