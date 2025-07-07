import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { messagesAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const GroupChat = () => {
  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadMessages();
  }, [groupId]);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      // MESSAGE_API.GET_MESSAGES - GET /groups/{groupId}/messages to load chat history
      const data = await messagesAPI.getGroupMessages(parseInt(groupId));
      setMessages(data);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);

    try {
      // In a real implementation, you would send this to the server
      // For now, we'll add it locally since there's no send message API endpoint
      const message = {
        id: Date.now(),
        content: newMessage.trim(),
        sender: user?.username || "You",
        timestamp: new Date().toISOString(),
      };

      setMessages([...messages, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
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
              <p className="text-travel-blue/70">Loading chat...</p>
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

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-travel-blue/10 rounded-xl flex items-center justify-center">
                <MessageCircle className="text-travel-blue" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Group Chat</h1>
                <p className="text-gray-600">
                  Communicate with your group members
                </p>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-travel-blue/10 flex flex-col h-[calc(100vh-280px)]">
            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No messages yet
                  </h3>
                  <p className="text-gray-600">
                    Start the conversation with your group members
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === user?.username
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === user?.username
                            ? "bg-travel-blue text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {message.sender !== user?.username && (
                          <p className="text-xs font-medium mb-1 opacity-70">
                            {message.sender}
                          </p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === user?.username
                              ? "text-white/70"
                              : "text-gray-500"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-gray-200 p-4"
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder=""
                  className="flex-1 px-4 py-3 border border-travel-blue/20 rounded-lg focus:ring-2 focus:ring-travel-blue focus:border-travel-blue"
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className="bg-travel-blue text-white px-6 py-3 rounded-lg hover:bg-travel-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {sending ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
