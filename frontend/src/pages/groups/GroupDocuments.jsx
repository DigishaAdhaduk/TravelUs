import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Upload,
  Download,
  Trash2,
  Eye,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { documentsAPI } from "../../services/api";

const GroupDocuments = () => {
  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDocuments();
  }, [groupId]);

  const loadDocuments = async () => {
    try {
      setIsLoading(true);
      // DOCUMENT_API.LIST - GET /groups/{groupId}/documents to fetch all group documents
      const data = await documentsAPI.getGroupDocuments(parseInt(groupId));
      setDocuments(data);
    } catch (error) {
      console.error("Error loading documents:", error);
      setError("Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is PDF
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    setUploading(true);
    setError("");

    try {
      // DOCUMENT_API.UPLOAD - POST /groups/{groupId}/documents/upload to upload PDF files
      const response = await documentsAPI.uploadDocument(
        parseInt(groupId),
        file,
      );
      console.log("Document uploaded:", response);
      await loadDocuments(); // Reload documents list
    } catch (error) {
      console.error("Error uploading document:", error);
      setError("Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  const handleViewDocument = async (documentId) => {
    try {
      const url = await documentsAPI.viewDocument(
        parseInt(groupId),
        documentId,
      );
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error viewing document:", error);
      setError("Failed to view document");
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      await documentsAPI.deleteDocument(parseInt(groupId), documentId);
      await loadDocuments(); // Reload documents list
    } catch (error) {
      console.error("Error deleting document:", error);
      setError("Failed to delete document");
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
              <p className="text-travel-blue/70">Loading documents...</p>
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
            <button
              onClick={() => navigate(`/groups/${groupId}`)}
              className="flex items-center gap-2 text-travel-blue hover:text-travel-purple mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Group
            </button>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-travel-blue/10 rounded-xl flex items-center justify-center">
                  <FileText className="text-travel-blue" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Documents
                  </h1>
                  <p className="text-gray-600">
                    Manage group documents and files
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="file-upload"
                  className={`flex items-center gap-2 bg-travel-blue text-white px-6 py-2 rounded-lg hover:bg-travel-purple transition-colors cursor-pointer ${
                    uploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Upload size={18} />
                  {uploading ? "Uploading..." : "Upload PDF"}
                </label>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Documents Grid */}
          <div className="bg-white rounded-2xl shadow-sm border border-travel-blue/10 p-6">
            {documents.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No documents yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Upload your first PDF document to get started
                </p>
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 bg-travel-blue text-white px-4 py-2 rounded-lg hover:bg-travel-purple transition-colors cursor-pointer"
                >
                  <Upload size={18} />
                  Upload PDF
                </label>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 border border-travel-blue/20 rounded-xl hover:border-travel-blue hover:bg-travel-blue/5 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="text-red-600" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {doc.fileName}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => handleViewDocument(doc.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-travel-blue/10 text-travel-blue rounded-lg hover:bg-travel-blue/20 transition-colors text-sm"
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button
                        onClick={() => window.open(doc.fileUrl, "_blank")}
                        className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      >
                        <Download size={14} />
                        Download
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
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

export default GroupDocuments;
