import React, { useState } from "react";

const dummyDocuments = [
  { name: "FlightTickets.pdf", uploadedBy: "Alice", date: "2025-06-10" },
  { name: "HotelBooking.jpg", uploadedBy: "Bob", date: "2025-06-11" },
  { name: "TravelPlan.docx", uploadedBy: "Charlie", date: "2025-06-12" },
];

export default function GroupDocuments() {
  const [documents, setDocuments] = useState(dummyDocuments);
  const [fileName, setFileName] = useState("");

  const handleUpload = () => {
    if (fileName.trim()) {
      setDocuments([
        ...documents,
        { name: fileName.trim(), uploadedBy: "You", date: new Date().toISOString().split("T")[0] },
      ]);
      setFileName("");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-8">
      <h2 className="text-3xl font-bold text-[#192166] mb-6">Group Documents</h2>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Enter document name..."
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleUpload}
            className="bg-[#192166] text-white px-6 py-3 rounded-lg hover:bg-[#101547]"
          >
            Upload
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {documents.map((doc, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-[#192166]">{doc.name}</p>
              <p className="text-sm text-gray-500">
                Uploaded by {doc.uploadedBy} on {doc.date}
              </p>
            </div>
            <button className="text-[#192166] font-medium hover:underline">Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
