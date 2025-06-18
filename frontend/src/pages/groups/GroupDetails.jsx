import React, { useState } from "react";

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
    plan: [
      { name: "Flight to Goa", date: "2025-06-20", time: "10:00", location: "Mumbai Airport" },
      { name: "Check-in Hotel", date: "2025-06-20", time: "13:00", location: "Beach Resort" },
    ],
  },
];

export default function GroupDetailPage() {
  const [activeGroup] = useState(groupsData[0]);
  const [activeTab, setActiveTab] = useState("overview");
  const [newDoc, setNewDoc] = useState("");
  const [chatMsg, setChatMsg] = useState("");
  const [tripItem, setTripItem] = useState({ name: "", date: "", time: "", location: "" });

  const handleAddDocument = () => {
    if (newDoc.trim()) {
      activeGroup.documents.push(newDoc.trim());
      setNewDoc("");
    }
  };

  const handleAddMessage = () => {
    if (chatMsg.trim()) {
      activeGroup.chat.push({ user: "You", message: chatMsg.trim() });
      setChatMsg("");
    }
  };

  const handleAddTripItem = () => {
    if (tripItem.name && tripItem.date && tripItem.time && tripItem.location) {
      activeGroup.plan.push(tripItem);
      setTripItem({ name: "", date: "", time: "", location: "" });
    }
  };

  const tabs = ["overview", "members", "documents", "chat", "trip plan"];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/5 bg-[#192166] text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Group</h2>
        <h3 className="text-lg font-semibold">{activeGroup.name}</h3>
        <ul className="mt-8 space-y-2">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`capitalize cursor-pointer px-3 py-2 rounded-md ${
                activeTab === tab ? "bg-[#525c9c]" : "hover:bg-[#3c448f]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-4/5 p-8">
        <h2 className="text-3xl font-bold text-[#192166] mb-6">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        <div className="p-6 bg-white rounded-md shadow-md">
          {activeTab === "overview" && (
            <p className="text-gray-700 text-lg">
              Welcome to the {activeGroup.name} group! View members, share documents, chat, and plan your trip here.
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

          {activeTab === "trip plan" && (
            <div className="space-y-6">
              <ul className="text-gray-700 space-y-2">
                {activeGroup.plan.map((item, idx) => (
                  <li key={idx} className="border rounded p-3">
                    <strong>{item.name}</strong> — {item.date} {item.time}, {item.location}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Activity"
                  value={tripItem.name}
                  onChange={(e) => setTripItem({ ...tripItem, name: e.target.value })}
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="date"
                  value={tripItem.date}
                  onChange={(e) => setTripItem({ ...tripItem, date: e.target.value })}
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="time"
                  value={tripItem.time}
                  onChange={(e) => setTripItem({ ...tripItem, time: e.target.value })}
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={tripItem.location}
                  onChange={(e) => setTripItem({ ...tripItem, location: e.target.value })}
                  className="border px-3 py-2 rounded"
                />
              </div>
              <button
                onClick={handleAddTripItem}
                className="mt-2 bg-[#192166] text-white px-4 py-2 rounded"
              >
                Add Item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}