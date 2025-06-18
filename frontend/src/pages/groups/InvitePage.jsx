import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";

export default function InvitePage() {
  const [inviteLink, setInviteLink] = useState(
    "https://travelus.com/join/12345-group-id"
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col justify-center items-center text-[#192166] p-8">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold mb-4">Invite Friends</h2>
        <p className="mb-6 text-gray-600">
          Share this link with your friends to invite them to your group.
        </p>

        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            value={inviteLink}
            readOnly
            className="flex-1 p-3 outline-none text-sm text-gray-700"
          />
          <button
            onClick={handleCopy}
            className="bg-[#192166] text-white px-4 py-3 hover:bg-[#101547] transition-all"
          >
            <FaCopy />
          </button>
        </div>

        {copied && <p className="text-green-600 mt-2 text-sm">Link copied!</p>}

        <p className="mt-8 text-sm text-gray-500">
          Anyone with the link can join this group.
        </p>
      </div>
    </div>
  );
}
