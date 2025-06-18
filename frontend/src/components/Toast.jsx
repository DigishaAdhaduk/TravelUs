import React, { useEffect } from "react";
import { XCircle } from "lucide-react";

export default function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 border-l-4 rounded shadow-lg animate-slide-in ${bgColor[type]}`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose}>
        <XCircle size={18} />
      </button>
    </div>
  );
}
