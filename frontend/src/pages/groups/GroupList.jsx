import React, { useState } from "react";
import { Link } from "react-router-dom";

const groupsData = [
  {
    id: 1,
    name: "Goa Trip",
    members: ["Alice", "Bob", "Charlie", "David", "Eva"],
    documents: ["itinerary.pdf", "expenses.xlsx"],
    chat: [
      { user: "Alice", message: "Ready for the trip?" },
      { user: "Bob", message: "Yes, can't wait!" },
    ],
  },
  {
    id: 2,
    name: "Manali Adventure",
    members: ["Ravi", "Sita", "Mohan"],
    documents: ["route.png"],
    chat: [
      { user: "Sita", message: "Booked the bus tickets." },
      { user: "Mohan", message: "Awesome!" },
    ],
  },
  {
    id: 3,
    name: "Jaipur Weekend",
    members: ["John", "Nina", "Amit", "Sara"],
    documents: ["hotel_info.docx"],
    chat: [
      { user: "Nina", message: "Let’s plan shopping spots." },
      { user: "Amit", message: "I’ll make a list." },
    ],
  },
];

export default function GroupList() {
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [newDoc, setNewDoc] = useState("");
  const [chatMsg, setChatMsg] = useState("");

  const handleGroupClick = (group) => {
    setActiveGroup(group);
    setActiveTab("overview");
  };

  const tabs = ["overview", "members", "documents", "chat"];

  const handleAddDocument = () => {
    if (newDoc.trim()) {
      const updated = {
        ...activeGroup,
        documents: [...activeGroup.documents, newDoc.trim()],
      };
      setActiveGroup(updated);
      setNewDoc("");
    }
  };

  const handleAddMessage = () => {
    if (chatMsg.trim()) {
      const updated = {
        ...activeGroup,
        chat: [...activeGroup.chat, { user: "You", message: chatMsg.trim() }],
      };
      setActiveGroup(updated);
      setChatMsg("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#192166] text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Your Groups</h2>
        <ul className="space-y-4">
          {groupsData.map((group) => (
            <li
              key={group.id}
              className={`p-4 rounded cursor-pointer hover:bg-[#525c9c] ${
                activeGroup?.id === group.id ? "bg-[#525c9c]" : ""
              }`}
              onClick={() => handleGroupClick(group)}
            >
              <h3 className="text-lg font-semibold">{group.name}</h3>
              <p className="text-sm">{group.members.length} members</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        {activeGroup ? (
          <>
            <h2 className="text-3xl font-bold text-[#192166] mb-6">
              {activeGroup.name}
            </h2>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`capitalize px-4 py-2 rounded-t-md ${
                    activeTab === tab
                      ? "bg-[#192166] text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 bg-white shadow rounded-md">
              {activeTab === "overview" && (
                <p className="text-gray-700 text-lg">
                  Welcome to the {activeGroup.name} group! You can view members, share documents, and chat here.
                </p>
              )}

              {activeTab === "members" && (
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {activeGroup.members.map((member, idx) => (
                    <li key={idx}>{member}</li>
                  ))}
                </ul>
              )}

              {activeTab === "documents" && (
                <div className="space-y-4">
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {activeGroup.documents.map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                  <div className="flex gap-2 mt-4">
                    <input
                      type="text"
                      value={newDoc}
                      onChange={(e) => setNewDoc(e.target.value)}
                      placeholder="Enter document name"
                      className="border px-3 py-2 rounded w-full"
                    />
                    <button
                      onClick={handleAddDocument}
                      className="bg-[#192166] text-white px-4 py-2 rounded"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "chat" && (
                <div className="space-y-4">
                  <div className="space-y-3 text-gray-700">
                    {activeGroup.chat.map((msg, idx) => (
                      <div key={idx} className="border-b pb-2">
                        <strong>{msg.user}:</strong> {msg.message}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <input
                      type="text"
                      value={chatMsg}
                      onChange={(e) => setChatMsg(e.target.value)}
                      placeholder="Enter message"
                      className="border px-3 py-2 rounded w-full"
                    />
                    <button
                      onClick={handleAddMessage}
                      className="bg-[#192166] text-white px-4 py-2 rounded"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-600">Select a group to view details</p>
        )}
      </div>
    </div>
  );
}
