import React, { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // For now, just get user data from localStorage
        // In a real app, you'd validate the token with the backend
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        setUser(userData);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password);
      console.log("Login response:", response);

      if (response.token) {
        localStorage.setItem("token", response.token);

        // Create user object from login response
        const userData = {
          username: username,
          name: username.charAt(0).toUpperCase() + username.slice(1),
        };

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        return userData;
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data || error.message || "Invalid credentials";
      throw new Error(errorMessage);
    }
  };

  const register = async (username, email, password, name) => {
    try {
      const response = await authAPI.signup(username, email, password, name);
      console.log("Signup response:", response);

      // After successful signup, login the user
      return await login(username, password);
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage =
        error.response?.data || error.message || "Registration failed";
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
