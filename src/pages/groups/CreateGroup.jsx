import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Plus } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { groupsAPI } from "../../services/api";

const CreateGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    groupName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdGroup, setCreatedGroup] = useState(null);
  const [inviteLink, setInviteLink] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.groupName.trim()) {
      setError("Group name is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Using GROUP_API.CREATE_GROUP - POST /groups/create to create new travel group
      const response = await groupsAPI.createGroup(formData.groupName.trim());
      console.log("Group created:", response);

      // Extract group ID from response and get invite link
      const groupIdMatch = response.match(/ID:\s*(\d+)/);
      if (groupIdMatch) {
        const groupId = parseInt(groupIdMatch[1]);
        // Using GROUP_API.INVITE - POST /groups/{groupId}/invite to generate invite link
        const inviteResponse = await groupsAPI.inviteToGroup(groupId);
        setInviteLink(inviteResponse);
        setCreatedGroup({ id: groupId, name: formData.groupName.trim() });
      } else {
        navigate("/groups");
      }
    } catch (err) {
      setError(err.message || "Failed to create group. Please try again.");
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
                <Plus className="text-travel-blue" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Create New Group
                </h1>
                <p className="text-gray-600">
                  Start a new travel group and invite your friends
                </p>
              </div>
            </div>
          </div>

          {/* Success Screen */}
          {createdGroup && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl shadow-sm border border-travel-blue/10 p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="text-green-600" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Group Created Successfully!
                  </h2>
                  <p className="text-gray-600">
                    "{createdGroup.name}" has been created. Share the invite
                    link below to add members.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Invite Link
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inviteLink}
                        readOnly
                        className="flex-1 px-4 py-3 border border-travel-blue/20 rounded-lg bg-gray-50 text-gray-700"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(inviteLink);
                          // Could add a toast notification here
                        }}
                        className="px-4 py-3 bg-travel-blue text-white rounded-lg hover:bg-travel-purple transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Share this link with people you want to invite to your
                      group
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button
                      onClick={() => navigate(`/groups/${createdGroup.id}`)}
                      className="bg-travel-blue text-white px-6 py-3 rounded-lg hover:bg-travel-purple transition-colors"
                    >
                      Go to Group
                    </button>
                    <button
                      onClick={() => navigate("/groups")}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      View All Groups
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          {!createdGroup && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl shadow-sm border border-travel-blue/10 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Group Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Group Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="groupName"
                      value={formData.groupName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-travel-blue/20 rounded-lg focus:ring-2 focus:ring-travel-blue focus:border-travel-blue"
                      placeholder=""
                      required
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Choose a descriptive name for your travel group
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-travel-blue text-white px-8 py-3 rounded-lg hover:bg-travel-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Users size={20} />
                          Create Group
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("/groups")}
                      className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
