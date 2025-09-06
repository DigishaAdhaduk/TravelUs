import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Error boundary for the entire app
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 p-3">
              <img
                src="https://cdn.builder.io/api/v1/assets/dfadf13641e64a01b7846f2c64f8a6bc/screenshot_2025-05-25_at_10.46.04_am-removebg-preview-bcec59?format=webp&width=400"
                alt="TravelUs Logo"
                className="w-full h-full object-contain opacity-50"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-travel-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-travel-purple transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
