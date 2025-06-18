import React, { useState } from "react";

const dummyMessages = [
  { sender: "Alice", text: "Hey, when are we meeting?" },
  { sender: "Bob", text: "Let's plan tomorrow evening." },
  { sender: "Charlie", text: "I’m good with that!" },
];

export default function GroupChat() {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "You", text: input.trim() }]);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-8 flex flex-col">
      <h2 className="text-3xl font-bold text-[#192166] mb-6">Group Chat</h2>
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 p-3 rounded-lg max-w-xs ${
              msg.sender === "You" ? "bg-[#192166] text-white ml-auto" : "bg-gray-200 text-gray-800"
            }`}
          >
            <p className="text-sm font-semibold">{msg.sender}</p>
            <p className="text-base">{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300"
        />
        <button
          onClick={handleSend}
          className="bg-[#192166] text-white px-6 py-3 rounded-lg hover:bg-[#101547]"
        >
          Send
        </button>
      </div>
    </div>
  );
}
