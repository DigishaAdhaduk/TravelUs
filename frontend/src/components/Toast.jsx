import React from "react";
import PropTypes from "prop-types";

const Toast = ({ message, type = "info", isVisible, onClose }) => {
  if (!isVisible) return null;

  const getToastStyles = () => {
    const baseStyles =
      "fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform";
    const typeStyles = {
      success: "bg-green-500 text-white",
      error: "bg-red-500 text-white",
      warning: "bg-yellow-500 text-black",
      info: "bg-blue-500 text-white",
    };
    return `${baseStyles} ${typeStyles[type]}`;
  };

  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className={getToastStyles()}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-lg font-bold hover:opacity-70"
        >
          ×
        </button>
      </div>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
