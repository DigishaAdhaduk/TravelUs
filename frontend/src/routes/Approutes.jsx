import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Auth Pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// Main Pages
import Dashboard from "../pages/Dashboard";

// Group Pages
import GroupList from "../pages/groups/GroupList";
import CreateGroup from "../pages/groups/CreateGroup";
import JoinGroup from "../pages/groups/JoinGroup";
import GroupDetails from "../pages/groups/GroupDetails";
import AddExpenses from "../pages/groups/AddExpenses";
import GroupDocuments from "../pages/groups/GroupDocuments";
import GroupChat from "../pages/groups/GroupChat";
import GroupExpenses from "../pages/groups/GroupExpenses";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#192166] to-[#2D1B69] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mx-auto mb-4">
            <span className="text-3xl font-bold text-white">T</span>
          </div>
          <p className="text-white text-lg font-medium">Loading TravelUs...</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#192166] to-[#2D1B69] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mx-auto mb-4">
            <span className="text-3xl font-bold text-white">T</span>
          </div>
          <p className="text-white text-lg font-medium">Loading TravelUs...</p>
        </div>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Group Routes - All confirmed in API */}
      <Route
        path="/groups"
        element={
          <ProtectedRoute>
            <GroupList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups/create"
        element={
          <ProtectedRoute>
            <CreateGroup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups/join"
        element={
          <ProtectedRoute>
            <JoinGroup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups/:id"
        element={
          <ProtectedRoute>
            <GroupDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups/:id/expenses"
        element={
          <ProtectedRoute>
            <GroupExpenses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups/:id/documents"
        element={
          <ProtectedRoute>
            <GroupDocuments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups/:id/chat"
        element={
          <ProtectedRoute>
            <GroupChat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/expenses/add"
        element={
          <ProtectedRoute>
            <AddExpenses />
          </ProtectedRoute>
        }
      />

      {/* Default redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-travel-blue/5 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
              <p className="text-gray-600 mb-4">Page not found</p>
              <a
                href="/dashboard"
                className="text-travel-blue hover:text-travel-purple font-medium"
              >
                Go back to dashboard
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
