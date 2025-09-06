import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Receipt,
  MessageCircle,
  FileText,
  UserPlus,
  Share2,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { groupsAPI, expensesAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const GroupDetails = () => {
  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const { user } = useAuth();
  const [group, setGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inviteLink, setInviteLink] = useState("");
  const [showInviteLink, setShowInviteLink] = useState(false);

  useEffect(() => {
    loadGroupDetails();
  }, [groupId]);

  const loadGroupDetails = async () => {
    try {
      setIsLoading(true);
      const groupData = await groupsAPI.getGroup(parseInt(groupId));
      setGroup(groupData);
    } catch (error) {
      console.error("Error loading group details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteMembers = async () => {
    try {
      const response = await groupsAPI.inviteToGroup(parseInt(groupId));
      setInviteLink(response);
      setShowInviteLink(true);
    } catch (error) {
      console.error("Error generating invite link:", error);
    }
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    // Could add toast notification here
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
              <p className="text-travel-blue/70">Loading group details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-travel-blue/5">
        <Navbar />
        <div className="flex pt-16">
          <Sidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Group not found
              </h3>
              <p className="text-gray-600 mb-4">
                The group you're looking for doesn't exist or you don't have
                access.
              </p>
              <button
                onClick={() => navigate("/groups")}
                className="bg-travel-blue text-white px-4 py-2 rounded-lg hover:bg-travel-purple transition-colors"
              >
                Back to Groups
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = group.adminUsername === user?.username;

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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-travel-blue/10 rounded-xl flex items-center justify-center">
                  <Users className="text-travel-blue" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {group.groupName}
                  </h1>
                  <p className="text-gray-600">
                    {group.members.length} members • Admin:{" "}
                    {group.adminUsername}
                  </p>
                </div>
              </div>

              {isAdmin && (
                <button
                  onClick={handleInviteMembers}
                  className="flex items-center gap-2 bg-travel-blue text-white px-6 py-2 rounded-lg hover:bg-travel-purple transition-colors"
                >
                  <UserPlus size={18} />
                  Invite Members
                </button>
              )}
            </div>
          </div>

          {/* Invite Link Modal */}
          {showInviteLink && (
            <div className="mb-8 bg-white rounded-2xl shadow-sm border border-travel-blue/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Invite Members
                </h3>
                <button
                  onClick={() => setShowInviteLink(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="flex-1 px-4 py-3 border border-travel-blue/20 rounded-lg bg-gray-50 text-gray-700"
                />
                <button
                  onClick={copyInviteLink}
                  className="px-4 py-3 bg-travel-blue text-white rounded-lg hover:bg-travel-purple transition-colors"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Share this link with people you want to invite to your group
              </p>
            </div>
          )}

          {/* Group Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => navigate(`/groups/${groupId}/expenses`)}
              className="p-6 bg-white rounded-2xl shadow-sm border border-travel-blue/10 hover:border-travel-blue hover:bg-travel-blue/5 transition-all text-left group"
            >
              <div className="w-12 h-12 bg-travel-blue rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Receipt className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-travel-blue transition-colors">
                Expenses
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Track and manage expenses
              </p>
            </button>

            <button
              onClick={() => navigate(`/groups/${groupId}/chat`)}
              className="p-6 bg-white rounded-2xl shadow-sm border border-travel-blue/10 hover:border-travel-blue hover:bg-travel-blue/5 transition-all text-left group"
            >
              <div className="w-12 h-12 bg-travel-blue rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-travel-blue transition-colors">
                Chat
              </h3>
              <p className="text-sm text-gray-600 mt-1">Group communication</p>
            </button>

            <button
              onClick={() => navigate(`/groups/${groupId}/documents`)}
              className="p-6 bg-white rounded-2xl shadow-sm border border-travel-blue/10 hover:border-travel-blue hover:bg-travel-blue/5 transition-all text-left group"
            >
              <div className="w-12 h-12 bg-travel-blue rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-travel-blue transition-colors">
                Documents
              </h3>
              <p className="text-sm text-gray-600 mt-1">Manage group files</p>
            </button>

            <button
              onClick={() => navigate("/expenses/add")}
              className="p-6 bg-white rounded-2xl shadow-sm border border-travel-blue/10 hover:border-travel-blue hover:bg-travel-blue/5 transition-all text-left group"
            >
              <div className="w-12 h-12 bg-travel-blue rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Share2 className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-travel-blue transition-colors">
                Add Expense
              </h3>
              <p className="text-sm text-gray-600 mt-1">Record new expense</p>
            </button>
          </div>

          {/* Members List */}
          <div className="bg-white rounded-2xl shadow-sm border border-travel-blue/10 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Group Members ({group.members.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.members.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg"
                >
                  <div className="w-10 h-10 bg-travel-blue/10 rounded-full flex items-center justify-center">
                    <span className="font-medium text-travel-blue">
                      {member.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member}</p>
                    {member === group.adminUsername && (
                      <p className="text-xs text-travel-blue">Admin</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
