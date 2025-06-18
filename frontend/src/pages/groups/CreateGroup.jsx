import React, { useState } from "react";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([""]);
  const [inviteLink, setInviteLink] = useState("");

  const handleAddMember = () => {
    setMembers([...members, ""]);
  };

  const handleMemberChange = (index, value) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: groupName,
      description,
      members: members.filter((m) => m.trim() !== ""),
    };

    console.log("Group created:", payload);

    // Simulate backend group ID and invite link
    const fakeGroupId = Math.random().toString(36).substring(2, 8);
    const link = `${window.location.origin}/join?group=${fakeGroupId}`;
    setInviteLink(link);

    // Reset form (optional)
    setGroupName("");
    setDescription("");
    setMembers([""]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#192166] mb-6">Create a New Group</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-[#192166]"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              rows="3"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Add Members</label>
            {members.map((member, index) => (
              <input
                key={index}
                type="text"
                value={member}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                placeholder={`Member ${index + 1} email`}
                className="w-full mb-2 px-4 py-2 border border-gray-300 rounded"
              />
            ))}
            <button
              type="button"
              onClick={handleAddMember}
              className="text-sm text-[#192166] font-medium hover:underline"
            >
              + Add Another Member
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#192166] text-white px-6 py-2 rounded hover:bg-[#0f1540]"
          >
            Create Group
          </button>
        </form>

        {inviteLink && (
          <div className="mt-6 p-4 bg-[#f1f3fc] border border-[#192166] rounded-md">
            <p className="font-medium text-[#192166] mb-2">Share this invite link:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={inviteLink}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm"
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(inviteLink);
                  alert("Invite link copied!");
                }}
                className="bg-[#192166] text-white px-3 py-1 rounded text-sm hover:bg-[#0f1540]"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
