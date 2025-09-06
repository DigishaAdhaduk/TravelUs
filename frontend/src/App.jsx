import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/Approutes";

// Import theme CSS
import "./styles/theme.css";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

// Main App Component
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "white",
                color: "#1f2937",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "14px",
                padding: "16px",
              },
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "white",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "white",
                },
              },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
